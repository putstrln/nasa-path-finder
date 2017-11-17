package com.nasa;

import java.io.IOException;
import java.util.Map;
import java.util.List;
import java.util.ArrayList;
import java.util.Arrays;
import fi.iki.elonen.NanoHTTPD.Response;

//import org.nanohttpd.NanoHTTPD;
// NOTE: If you"re using NanoHTTPD < 3.0.0 the namespace is different,
//       instead of the above import use the following:
import fi.iki.elonen.NanoHTTPD;
import java.util.HashMap;
import com.google.gson.Gson;

public class App extends NanoHTTPD {

  public App() throws IOException {
    super(8080);
    start(NanoHTTPD.SOCKET_READ_TIMEOUT, false);
    System.out.println("\nRunning at port 8080/ \n");
  }

  public static void main(String[] args) {
    try {
      new App();
    } catch (IOException ioe) {
      System.err.println("Couldn't start server:\n" + ioe);
    }
  }

  @Override
  public Response serve(IHTTPSession session) {
    Map<String, String> map = new HashMap<String, String>();
    Method method = session.getMethod();
    if (Method.PUT.equals(method) || Method.POST.equals(method)) {
      try {
        session.parseBody(map);
      } catch (IOException ioe) {
        return newFixedLengthResponse(Response.Status.INTERNAL_ERROR, MIME_PLAINTEXT, "SERVER INTERNAL ERROR: IOException: " + ioe.getMessage());
      } catch (ResponseException re) {
        return newFixedLengthResponse(re.getStatus(), MIME_PLAINTEXT, re.getMessage());
      }
    }
    /*
      example client request body
      {
        startHandrail: 'ABC',
        endHandrail: 'XYZ',
        nodes: [{
        	"unique_node_name": "HWY_XXX",
        	"geometry_file_name": "HWY_XXX.stl",
        	"x": "221.42",
        	"y": "0.00",
        	"z": "190.95",
        	"pitch": "180.00",
        	"yaw": "0.00",
        	"roll": "180.00",
        	"parent_node_name": "SSREF"
        },
        {
        	"unique_node_name": "HWY_XXX",
        	"geometry_file_name": "HWY_XXX.stl",
        	"x": "221.42",
        	"y": "0.00",
        	"z": "190.95",
        	"pitch": "180.00",
        	"yaw": "0.00",
        	"roll": "180.00",
        	"parent_node_name": "SSREF"
        }],
      }
    */
    String postBody = map.get("postData");
    Gson gson = new Gson();
    RouteRequest rr = new RouteRequest("", "", new ArrayList<Node>());
    try {
      rr = gson.fromJson(postBody, RouteRequest.class);
    } catch (Exception e) {
      System.out.println(e.getMessage());
    }
    System.out.println(rr.getStartHandrail());
    System.out.println(rr.getEndHandrail());
    ArrayList<Node> nodes = rr.getNodes();
    for (Node node : nodes) {
      System.out.println(node.toString());
    }
    /*
      use nodes to process shortest path and return a json array of routes documented in architecture document. For example,
      [
        {
          nodes: [],
          ...otherMetaDataProperties
        }
      ]
    */
    String[] fakeNodes = {
      "LAB_0259",
      "LAB_0233",
      "LAB_0268",
      "LAB_0232",
      "LAB_0237",
      "LAB_0201",
      "LAB_0295",
      "LAB_0208",
      "LAB_0239",
      "LAB_0293",
      "LAB_0280",
      "LAB_0200",
      "LAB_0267",
      "LAB_0242",
      "LAB_0288",
      "LAB_0223",
      "LAB_0277",
      "LAB_0252",
      "LAB_0270",
      "LAB_0243",
      "LAB_0216",
      "LAB_0266",
    };

    String resultJson = "[{\"nodes\":" + gson.toJson(fakeNodes) + "}]";
    Response response = newFixedLengthResponse(resultJson);
    response.addHeader("Access-Control-Allow-Origin", "*");
    return response;
  }
}
