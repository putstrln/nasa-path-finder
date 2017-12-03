/*
 * Copyright (C) 2017 jadovan
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
package com.nasa;

/**
 * Project: NASA Path in conjunction with University of Maryland University
 * College
 *
 * @author jadovan
 */
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

public class DijkstraPaths {

    private List<Node> nodes;
    private List<Edge> edges;

    CreateNodes cn = new CreateNodes();

    public List getShortestPaths(String source, String destination, List<Node> nodes) {
      int sourceIndex = nodes.indexOf(source);
      int destinationIndex = nodes.indexOf(destination);
      Graph graph1 = new Graph(nodes, getEdgesFromNodes(nodes, 54));
      Dijkstra dijkstra1 = new Dijkstra(graph1);
      dijkstra1.execute(nodes.get(sourceIndex));
      return dijkstra1.getPath(nodes.get(destinationIndex));
    }

    // This method processes the Dijkstra Algorithm for the three shortest paths
    public void ExecutePaths(String source, String destination) {

        cn.createS0LabHandHoldNodeList();

        /* *********************************************************************
        * The following lines executes the Dijkstra Algorithm by retrieving the
        * ArrayList index number of the source and destination nodes entered.
        * This process is evaluated in the TestDijkstraPaths.java file utilizing
        * the Scanner method. This executes the first shortest path.
        ********************************************************************* */
        int sourceIndex = cn.s0LabHandHoldNodeIndexList.indexOf(source);
        int destinationIndex = cn.s0LabHandHoldNodeIndexList.indexOf(destination);
        Graph graph1 = new Graph(pathNodes(), pathOneEdges());
        Dijkstra dijkstra1 = new Dijkstra(graph1);
        dijkstra1.execute(nodes.get(sourceIndex));
        LinkedList<Node> path1 = dijkstra1.getPath(nodes.get(destinationIndex));

        System.out.println("1st path from " + nodes.get(sourceIndex).getNodeId()
                + " to " + nodes.get(destinationIndex).getNodeId());

        if (path1 != null) {
            path1.forEach((node1) -> {
                System.out.println(node1.getNodeId());
            });
        } else {
            System.out.println("1st path could not be determined between these nodes.");
        }

        /* *********************************************************************
        * The following lines executes the Dijkstra Algorithm by retrieving the
        * ArrayList index number of the source and destination nodes entered.
        * This process is evaluated in the TestDijkstraPaths.java file utilizing
        * the Scanner method. This executes the second shortest path.
        ********************************************************************* */
        Graph graph2 = new Graph(pathNodes(), pathTwoEdges());
        Dijkstra dijkstra2 = new Dijkstra(graph2);
        dijkstra2.execute(nodes.get(sourceIndex));
        LinkedList<Node> path2 = dijkstra2.getPath(nodes.get(destinationIndex));

        System.out.println("\n2nd path from " + nodes.get(sourceIndex).getNodeId()
                + " to " + nodes.get(destinationIndex).getNodeId());

        if (path2 != null) {
            path2.forEach((node2) -> {
                System.out.println(node2.getNodeId());
            });
        } else {
            System.out.println("2nd path could not be determined between these nodes.");
        }

        /* *********************************************************************
        * The following lines executes the Dijkstra Algorithm by retrieving the
        * ArrayList index number of the source and destination nodes entered.
        * This process is evaluated in the TestDijkstraPaths.java file utilizing
        * the Scanner method. This exeuctes the third shortest path.
        ********************************************************************* */
        Graph graph3 = new Graph(pathNodes(), pathThreeEdges());
        Dijkstra dijkstra3 = new Dijkstra(graph3);
        dijkstra3.execute(nodes.get(sourceIndex));
        LinkedList<Node> path3 = dijkstra3.getPath(nodes.get(destinationIndex));

        System.out.println("\n3rd path from " + nodes.get(sourceIndex).getNodeId()
                + " to " + nodes.get(destinationIndex).getNodeId());

        if (path3 != null) {
            path3.forEach((node3) -> {
                System.out.println(node3.getNodeId());
            });
        } else {
            System.out.println("3rd path could not be determined between these nodes.");
        }

    }

    // This method is used for creating the Edge lanes to be processed by the Dijkstra Algorithm
    private void addLane(String laneId, int sourceLocNo, int destLocNo,
            double duration) {
        Edge lane = new Edge(laneId, nodes.get(sourceLocNo), nodes.get(destLocNo), duration);
        edges.add(lane);
    }

    // This method adds node locations for the shortest paths
    private List pathNodes() {
        nodes = new ArrayList<>();

        cn.createS0LabHandHoldNodeList();

        // These for loops add lanes to the s0 and lab nodes for the shortest paths
        for (int i = 0; i < cn.s0LabHandHoldNodeList.size(); i++) {
            Node location = new Node(cn.s0LabHandHoldNodeList.get(i).getNodeId());
            nodes.add(location);
        }

        return nodes;
    }

    private List getEdgesFromNodes(List<Node> nodes, double weightThreshold) {
      edges = new ArrayList<>();
      ArrayList<String> nodeIndexList = new ArrayList<String>();
      for (Node node : nodes) {
        nodeIndexList.add(node.getNodeId());
      }
      for (int j = 0; j < nodes.size(); j++) {
          for (int k = 0; k < nodes.size(); k++) {
              String s0LabNodesJ = nodeIndexList.get(j);
              String s0LabNodesK = nodeIndexList.get(k);
              double weight = cn.node_distance_formula(nodes.get(j), nodes.get(k));
              if (weight <= weightThreshold) {
                  addLane("Edge_" + j, nodeIndexList.indexOf(s0LabNodesJ),
                          nodeIndexList.indexOf(s0LabNodesK), weight);
              }
          }

      }
      return edges;
    }

    // This method adds lanes for the first shortest path
    private List pathOneEdges() {
        edges = new ArrayList<>();

        cn.createS0LabHandHoldNodeList();

        for (int j = 0; j < cn.s0LabHandHoldNodeList.size(); j++) {
            for (int k = 0; k < cn.s0LabHandHoldNodeList.size(); k++) {
                String s0LabNodesJ = cn.s0LabHandHoldNodeIndexList.get(j);
                String s0LabNodesK = cn.s0LabHandHoldNodeIndexList.get(k);
                double weight = cn.node_distance_formula(cn.s0LabHandHoldNodeList.get(j), cn.s0LabHandHoldNodeList.get(k));
                if (weight <= 54) {
                    addLane("Edge_" + j, cn.s0LabHandHoldNodeIndexList.indexOf(s0LabNodesJ),
                            cn.s0LabHandHoldNodeIndexList.indexOf(s0LabNodesK), weight);
                }
            }

        }
        return edges;
    }

    // This method adds lanes for the second shortest path
    private List pathTwoEdges() {
        edges = new ArrayList<>();

        cn.createS0LabHandHoldNodeList();

        for (int j = 0; j < cn.s0LabHandHoldNodeList.size(); j++) {
            for (int k = 0; k < cn.s0LabHandHoldNodeList.size(); k++) {
                String s0LabNodesJ = cn.s0LabHandHoldNodeIndexList.get(j);
                String s0LabNodesK = cn.s0LabHandHoldNodeIndexList.get(k);
                double weight = cn.node_distance_formula(cn.s0LabHandHoldNodeList.get(j), cn.s0LabHandHoldNodeList.get(k));
                if (weight <= 62) {
                    addLane("Edge_" + j, cn.s0LabHandHoldNodeIndexList.indexOf(s0LabNodesJ),
                            cn.s0LabHandHoldNodeIndexList.indexOf(s0LabNodesK), weight);
                }
            }

        }
        return edges;
    }

    // This method adds lanes for the third shortest path
    private List pathThreeEdges() {
        edges = new ArrayList<>();

        cn.createS0LabHandHoldNodeList();

        for (int j = 0; j < cn.s0LabHandHoldNodeList.size(); j++) {
            for (int k = 0; k < cn.s0LabHandHoldNodeList.size(); k++) {
                String s0LabNodesJ = cn.s0LabHandHoldNodeIndexList.get(j);
                String s0LabNodesK = cn.s0LabHandHoldNodeIndexList.get(k);
                double weight = cn.node_distance_formula(cn.s0LabHandHoldNodeList.get(j), cn.s0LabHandHoldNodeList.get(k));
                if (weight <= 70) {
                    addLane("Edge_" + j, cn.s0LabHandHoldNodeIndexList.indexOf(s0LabNodesJ),
                            cn.s0LabHandHoldNodeIndexList.indexOf(s0LabNodesK), weight);
                }
            }

        }
        return edges;
    }

}
