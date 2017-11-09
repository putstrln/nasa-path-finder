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
package dijkstra;

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

    // This method processes the Dijkstra Algorithm for the first shortest path
    public void testExecutePath1(String source, String destination) {
        nodes = new ArrayList<>();
        edges = new ArrayList<>();
        
        CreateNodes cn = new CreateNodes();
        cn.createS0LabHandHoldNodeList();
        cn.createS0LabHandHoldNodeListDistances();

        // These for loops add lanes to the s0 and lab nodes for the first shortest path
        for (int i = 0; i < cn.s0LabHandHoldNodeList.size(); i++) {
            Node location = new Node(cn.s0LabHandHoldNodeList.get(i).getNodeId());
            nodes.add(location);
        }
        
        

        for (int j = 0; j < cn.s0LabHandHoldNodeList.size(); j++) {
            for (int k = 0; k < cn.s0LabHandHoldNodeList.size(); k++) {
                String s0LabNodesJ = cn.s0LabHandHoldNodeIndexList.get(j);
                String s0LabNodesK = cn.s0LabHandHoldNodeIndexList.get(k);
                double weight = cn.node_distance_formula(cn.s0LabHandHoldNodeList.get(j), cn.s0LabHandHoldNodeList.get(k));
                if (weight > 0 && weight <= 54) {         
                    addLane("Edge_" + j, cn.s0LabHandHoldNodeIndexList.indexOf(s0LabNodesJ),
                            cn.s0LabHandHoldNodeIndexList.indexOf(s0LabNodesK), weight);
                }
            }

        }

        /* *********************************************************************
        * The following lines test the Dijkstra Algorithm by retrieving the 
        * ArrayList index number of the source and destination nodes entered.
        * This process is evaluated in the TestDistance.java file utilizing the
        * Scanner method. This tests the first shortest path.
        ********************************************************************* */
        int sourceIndex = cn.s0LabHandHoldNodeIndexList.indexOf(source);
        int destinationIndex = cn.s0LabHandHoldNodeIndexList.indexOf(destination);
        Graph graph1 = new Graph(nodes, edges);
        Dijkstra dijkstra1 = new Dijkstra(graph1);
        dijkstra1.execute(nodes.get(sourceIndex));
        LinkedList<Node> path1 = dijkstra1.getPath(nodes.get(destinationIndex));

        System.out.println("1st path from " + nodes.get(sourceIndex).getNodeId()
                + " to " + nodes.get(destinationIndex).getNodeId());

        path1.forEach((node1) -> {
            System.out.println(node1.getNodeId());
        });

    }

    // This method processes the Dijkstra Algorithm for the second shortest path
    public void testExecutePath2(String source, String destination) {
        nodes = new ArrayList<>();
        edges = new ArrayList<>();

        CreateNodes cn = new CreateNodes();
        cn.createS0LabHandHoldNodeList();

        // These for loops add lanes to the s0 and lab nodes for the second shortest path
        for (int i = 0; i < cn.s0LabHandHoldNodeList.size(); i++) {
            Node location = new Node(cn.s0LabHandHoldNodeList.get(i).getNodeId());
            nodes.add(location);
        }

        for (int j = 0; j < cn.s0LabHandHoldNodeList.size(); j++) {

            for (int k = 0; k < cn.s0LabHandHoldNodeList.size(); k++) {
                String s0LabNodesJ = cn.s0LabHandHoldNodeIndexList.get(j);
                String s0LabNodesK = cn.s0LabHandHoldNodeIndexList.get(k);
                double weight = cn.node_distance_formula(cn.s0LabHandHoldNodeList.get(j), cn.s0LabHandHoldNodeList.get(k));                
                if (weight > 0 && weight <= 63) {
                    addLane("Edge_" + j, cn.s0LabHandHoldNodeIndexList.indexOf(s0LabNodesJ),
                            cn.s0LabHandHoldNodeIndexList.indexOf(s0LabNodesK), weight);
                }

            }

        }

        /* *********************************************************************
        * The following lines test the Dijkstra Algorithm by retrieving the 
        * ArrayList index number of the source and destination nodes entered.
        * This process is evaluated in the TestDistance.java file utilizing the
        * Scanner method. This tests the second shortest path.
        ********************************************************************* */
        int sourceIndex = cn.s0LabHandHoldNodeIndexList.indexOf(source);
        int destinationIndex = cn.s0LabHandHoldNodeIndexList.indexOf(destination);
        Graph graph2 = new Graph(nodes, edges);
        Dijkstra dijkstra2 = new Dijkstra(graph2);
        dijkstra2.execute(nodes.get(sourceIndex));
        LinkedList<Node> path2 = dijkstra2.getPath(nodes.get(destinationIndex));

        System.out.println("2nd path from " + nodes.get(sourceIndex).getNodeId()
                + " to " + nodes.get(destinationIndex).getNodeId());

        path2.forEach((node2) -> {
            System.out.println(node2.getNodeId());
        });

    }

    // This method processes the Dijkstra Algorithm for the third shortest path
    public void testExecutePath3(String source, String destination) {
        nodes = new ArrayList<>();
        edges = new ArrayList<>();

        CreateNodes cn = new CreateNodes();
        cn.createS0LabHandHoldNodeList();

        // These for loops add lanes to the s0 and lab nodes for the third shortest path
        for (int i = 0; i < cn.s0LabHandHoldNodeList.size(); i++) {
            Node location = new Node(cn.s0LabHandHoldNodeList.get(i).getNodeId());
            nodes.add(location);
        }

        for (int j = 0; j < cn.s0LabHandHoldNodeList.size(); j++) {

            for (int k = 0; k < cn.s0LabHandHoldNodeList.size(); k++) {
                String s0LabNodesJ = cn.s0LabHandHoldNodeIndexList.get(j);
                String s0LabNodesK = cn.s0LabHandHoldNodeIndexList.get(k);
                double weight = cn.node_distance_formula(cn.s0LabHandHoldNodeList.get(j), cn.s0LabHandHoldNodeList.get(k));                
                if (weight > 0 && weight <= 72) {
                    addLane("Edge_" + j, cn.s0LabHandHoldNodeIndexList.indexOf(s0LabNodesJ),
                            cn.s0LabHandHoldNodeIndexList.indexOf(s0LabNodesK), weight);
                }

            }

        }

        /* *********************************************************************
        * The following lines test the Dijkstra Algorithm by retrieving the 
        * ArrayList index number of the source and destination nodes entered.
        * This process is evaluated in the TestDistance.java file utilizing the
        * Scanner method. This tests the third shortest path.
        ********************************************************************* */
        int sourceIndex = cn.s0LabHandHoldNodeIndexList.indexOf(source);
        int destinationIndex = cn.s0LabHandHoldNodeIndexList.indexOf(destination);
        Graph graph3 = new Graph(nodes, edges);
        Dijkstra dijkstra3 = new Dijkstra(graph3);
        dijkstra3.execute(nodes.get(sourceIndex));
        LinkedList<Node> path3 = dijkstra3.getPath(nodes.get(destinationIndex));

        System.out.println("3rd path from " + nodes.get(sourceIndex).getNodeId()
                + " to " + nodes.get(destinationIndex).getNodeId());

        path3.forEach((node3) -> {
            System.out.println(node3.getNodeId());
        });

    }

    // This method creates the Edge lanes to be processed by the Dijkstra Algorithm
    private void addLane(String laneId, int sourceLocNo, int destLocNo,
            double duration) {
        Edge lane = new Edge(laneId, nodes.get(sourceLocNo), nodes.get(destLocNo), duration);
        edges.add(lane);
    }

    /* **These two methods are only needed if creating the nodes seperately
        * cn.createS0HandHoldNodeList();
        * cn.createLabHandholdNodeList();
        
        * These for loops only add lanes to the lab nodes
        
        for (int i = 0; i < cn.labHandHoldNodeList.size(); i++) {
            Node location = new Node(cn.labHandHoldNodeList.get(i).getNodeId());
            nodes.add(location);
        }

        for (int j = 0; j < cn.labHandHoldNodeList.size(); j++) {

            for (int k = 0; k < cn.labHandHoldNodeList.size(); k++) {
                String labNodesJ = cn.labHandHoldNodeIndexList.get(j);
                String labNodesK = cn.labHandHoldNodeIndexList.get(k);
                if (cn.node_distance_formula(cn.labHandHoldNodeList.get(j), cn.labHandHoldNodeList.get(k)) > 0
                        && cn.node_distance_formula(cn.labHandHoldNodeList.get(j), cn.labHandHoldNodeList.get(k)) < 52) {
                    addLane("Edge_" + j, cn.labHandHoldNodeIndexList.indexOf(labNodesJ),
                            cn.labHandHoldNodeIndexList.indexOf(labNodesK),
                            cn.node_distance_formula(cn.labHandHoldNodeList.get(j), cn.labHandHoldNodeList.get(k)));
                    addLane("Edge_" + j, cn.s0HandHoldNodeIndexList.indexOf(s0NodesJ),
                            cn.s0HandHoldNodeIndexList.indexOf(s0NodesK),
                            cn.node_distance_formula(cn.s0HandHoldNodeList.get(j), cn.s0HandHoldNodeList.get(k)));
                }

            }

        }
        *************************************************************************************************************** */
}
