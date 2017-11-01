/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.nasa;

/**
 *
 * @author jadov
 */
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

import static org.junit.Assert.*;

import org.junit.Test;

public class TestDijkstra {

    private List<Vertex> nodes;
    private List<Edge> edges;

    @Test
    public void testExecute() {
        nodes = new ArrayList<Vertex>();
        edges = new ArrayList<Edge>();
        Node node = new Node();
                for (int i = 0; i < 5000; i++) {
            Vertex location = new Vertex("Node_" + i,"Node_" + i);
            nodes.add(location);
        }

        /*addLane("Edge_0", 0, 1, 85);
        addLane("Edge_1", 0, 2, 217);
        addLane("Edge_2", 0, 4, 173);
        addLane("Edge_3", 2, 6, 186);
        addLane("Edge_4", 2, 7, 103);
        addLane("Edge_5", 3, 7, 183);
        addLane("Edge_6", 5, 8, 250);
        addLane("Edge_7", 8, 9, 84);
        addLane("Edge_8", 7, 9, 167);
        addLane("Edge_9", 4, 9, 502);
        addLane("Edge_10", 9, 10, 40);
        addLane("Edge_11", 1, 10, 600);*/
        
        Node node1 = new Node("S0_3494", 65.00, -44.31, -19.00);
        Node node2 = new Node("S0_3480", -45.30, -40.60, 38.20);
        Node node3 = new Node("S0_3495", -63.40, -48.00, -39.96);
        Node node4 = new Node("S0_3482", 63.40, 45.00, 39.96);
        
        
        addLane("Edge_0", 3494, 3480, (int) node.node_distance_formula(node1, node2));
        addLane("Edge_1", 3494, 3495, (int) node.node_distance_formula(node1, node3));
        addLane("Edge_2", 3480, 3495, (int) node.node_distance_formula(node2, node3));
        addLane("Edge_3", 3480, 3482, (int) node.node_distance_formula(node2, node4));
        
        /*Dijkstra distance = new Dijkstra(1);
        
        addLane("Edge_0", 0, 1, (int) distance.distance_formula(65.00, -44.31, -19.00, -45.30, -40.60, 38.20));
        addLane("Edge_1", 0, 2, (int) distance.distance_formula(-45.30, -40.60, 38.20, -63.40, -48.00, -39.96));
        addLane("Edge_2", 0, 4, (int) distance.distance_formula(-63.40, -48.00, -39.96, -63.40, 45.00, 39.96));*/
                
        
        // Lets check from location Loc_1 to Loc_10
        Graph graph = new Graph(nodes, edges);
        Dijkstra dijkstra = new Dijkstra(graph);
        dijkstra.execute(nodes.get(3494));
        LinkedList<Vertex> path = dijkstra.getPath(nodes.get(3482));

        assertNotNull(path);
        assertTrue(path.size() > 0);

        for (Vertex vertex : path) {
            System.out.println(vertex.getName());
        }

    }

    private void addLane(String laneId, int sourceLocNo, int destLocNo,
            int duration) {
        Edge lane = new Edge(laneId, nodes.get(sourceLocNo), nodes.get(destLocNo), duration );
        edges.add(lane);
    }
}
