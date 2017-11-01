package com.nasa;

import java.io.IOException;
import java.util.Map;

//import org.nanohttpd.NanoHTTPD;
// NOTE: If you're using NanoHTTPD < 3.0.0 the namespace is different,
//       instead of the above import use the following:
import fi.iki.elonen.NanoHTTPD;

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
    String msg = "<html><body><h1>Hello from nasa server</h1>\n";
		// read json request and call dijskra algorithm class here
    return newFixedLengthResponse(msg + "</body></html>\n");
  }
}
