package com.nasa;

import java.util.ArrayList;

public class RouteRequest {
  private String startHandrail;
  private String endHandrail;
  private ArrayList<Node> nodes;

  public RouteRequest(String startHandrail, String endHandrail, ArrayList<Node> nodes) {
    this.startHandrail = startHandrail;
    this.endHandrail = endHandrail;
    this.nodes = nodes;
  }

  public void setStartHandrail(String startHandrail) {
    this.startHandrail = startHandrail;
  }
  public void setEndHandrail(String endHandrail) {
    this.endHandrail = endHandrail;
  }
  public void setNodes(ArrayList<Node> nodes) {
    this.nodes = nodes;
  }
  public String getStartHandrail() {
    return this.startHandrail;
  }
  public String getEndHandrail() {
    return this.endHandrail;
  }
  public ArrayList<Node> getNodes() {
    return this.nodes;
  }
}
