/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package dijkstra;

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
            Vertex location = new Vertex("Lab_" + i, "Lab_" + i);
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
        //Nodes for capture-LAB200-207.PNG
        Node lab200 = new Node("Lab_0200", -45.78, -70.79, 242.38);
        Node lab201 = new Node("Lab_0201", -22.03, -70.79, 242.38);
        Node lab202 = new Node("Lab_0202", 13.34, -70.79, 242.38);
        Node lab203 = new Node("Lab_0203", 58.41, 70.79, 242.38);
        Node lab204 = new Node("Lab_0204", 101.24, -70.79, 242.38);
        Node lab205 = new Node("Lab_0205", 146.3, -70.79, 242.38);
        Node lab206 = new Node("Lab_0206", 182.67, -70.79, 242.38);
        Node lab207 = new Node("Lab_0207", 206.42, -70.79, 242.38);

        //Nodes for capture-LAB208-225.PNG
        Node lab208 = new Node("Lab_0208", -75.3, -67.48, 241.81);
        Node lab209 = new Node("Lab_0209", -75.3, -83.68, 202.72);
        Node lab210 = new Node("Lab_0210", -75.3, -78.07, 158.62);
        Node lab211 = new Node("Lab_0211", -75.3, -50.86, 123.47);
        Node lab212 = new Node("Lab_0212", -75.3, -11.77, 107.27);
        Node lab213 = new Node("Lab_0213", -75.3, 32.33, 112.88);
        Node lab214 = new Node("Lab_0214", -75.3, 67.48, 140.09);
        Node lab215 = new Node("Lab_0215", -75.3, 83.68, 179.18);
        Node lab216 = new Node("Lab_0216", -75.3, 78.07, 223.28);
        Node lab217 = new Node("Lab_0217", -75.3, 50.86, 258.43);
        Node lab218 = new Node("Lab_0218", -75.3, 17.57, 273.6);
        Node lab219 = new Node("Lab_0219", -75.3, -17.56, 273.6);
        Node lab220 = new Node("Lab_0220", -75.3, -46.02, 261.82);
        Node lab221 = new Node("Lab_0221", -79.08, -62.82, 216.97);
        Node lab222 = new Node("Lab_0222", -79.08, -26.02, 128.13);
        Node lab223 = new Node("Lab_0223", -79.08, 62.82, 164.93);
        Node lab224 = new Node("Lab_0224", -79.08, 26.02, 253.77);
        Node lab225 = new Node("Lab_0225", -45.78, -87.5, 190.95);

        //Nodes for capture-LAB230-232.PNG
        Node lab230 = new Node("Lab_0230", -45.78, 70.79, 242.38);
        Node lab231 = new Node("Lab_0231", -45.78, 27.04, 274.17);
        Node lab232 = new Node("Lab_0232", -45.78, -27.04, 274.17);

        addLane("Edge_0", 200, 201, (int) node.node_distance_formula(lab200, lab201));
        addLane("Edge_1", 200, 208, (int) node.node_distance_formula(lab200, lab208));
        addLane("Edge_2", 200, 232, (int) node.node_distance_formula(lab200, lab232));
        addLane("Edge_3", 201, 200, (int) node.node_distance_formula(lab201, lab200));
        addLane("Edge_4", 201, 202, (int) node.node_distance_formula(lab201, lab202));
        addLane("Edge_5", 202, 201, (int) node.node_distance_formula(lab202, lab201));
        addLane("Edge_6", 202, 203, (int) node.node_distance_formula(lab202, lab203));
        addLane("Edge_7", 203, 202, (int) node.node_distance_formula(lab203, lab202));
        addLane("Edge_8", 203, 204, (int) node.node_distance_formula(lab203, lab204));
        addLane("Edge_9", 204, 203, (int) node.node_distance_formula(lab204, lab203));
        addLane("Edge_10", 204, 205, (int) node.node_distance_formula(lab204, lab205));
        addLane("Edge_11", 205, 204, (int) node.node_distance_formula(lab205, lab204));
        addLane("Edge_12", 205, 206, (int) node.node_distance_formula(lab205, lab206));
        addLane("Edge_13", 206, 205, (int) node.node_distance_formula(lab206, lab205));
        addLane("Edge_14", 206, 207, (int) node.node_distance_formula(lab206, lab207));
        addLane("Edge_15", 207, 206, (int) node.node_distance_formula(lab207, lab206));
        addLane("Edge_16", 208, 200, (int) node.node_distance_formula(lab208, lab200));
        addLane("Edge_17", 208, 209, (int) node.node_distance_formula(lab208, lab209));
        addLane("Edge_18", 208, 220, (int) node.node_distance_formula(lab208, lab220));
        addLane("Edge_19", 208, 221, (int) node.node_distance_formula(lab208, lab221));
        addLane("Edge_20", 209, 208, (int) node.node_distance_formula(lab209, lab208));
        addLane("Edge_21", 209, 210, (int) node.node_distance_formula(lab209, lab210));
        addLane("Edge_22", 209, 221, (int) node.node_distance_formula(lab209, lab221));
        addLane("Edge_23", 210, 209, (int) node.node_distance_formula(lab210, lab209));
        addLane("Edge_24", 210, 211, (int) node.node_distance_formula(lab210, lab211));
        addLane("Edge_25", 211, 210, (int) node.node_distance_formula(lab211, lab210));
        addLane("Edge_26", 211, 212, (int) node.node_distance_formula(lab211, lab212));
        addLane("Edge_27", 211, 222, (int) node.node_distance_formula(lab211, lab222));
        addLane("Edge_28", 212, 211, (int) node.node_distance_formula(lab212, lab211));
        addLane("Edge_29", 212, 213, (int) node.node_distance_formula(lab212, lab213));
        addLane("Edge_30", 212, 222, (int) node.node_distance_formula(lab212, lab222));
        addLane("Edge_31", 213, 212, (int) node.node_distance_formula(lab213, lab212));
        addLane("Edge_32", 213, 214, (int) node.node_distance_formula(lab213, lab214));
        addLane("Edge_33", 214, 213, (int) node.node_distance_formula(lab214, lab213));
        addLane("Edge_34", 214, 215, (int) node.node_distance_formula(lab214, lab215));
        addLane("Edge_35", 214, 223, (int) node.node_distance_formula(lab214, lab223));
        addLane("Edge_36", 215, 214, (int) node.node_distance_formula(lab215, lab214));
        addLane("Edge_37", 215, 216, (int) node.node_distance_formula(lab215, lab216));
        addLane("Edge_38", 215, 223, (int) node.node_distance_formula(lab215, lab223));
        addLane("Edge_39", 216, 215, (int) node.node_distance_formula(lab216, lab215));
        addLane("Edge_40", 216, 217, (int) node.node_distance_formula(lab216, lab217));
        addLane("Edge_41", 217, 216, (int) node.node_distance_formula(lab217, lab216));
        addLane("Edge_42", 217, 218, (int) node.node_distance_formula(lab217, lab218));
        addLane("Edge_43", 217, 224, (int) node.node_distance_formula(lab217, lab224));
        addLane("Edge_44", 218, 217, (int) node.node_distance_formula(lab218, lab217));
        addLane("Edge_45", 218, 219, (int) node.node_distance_formula(lab218, lab219));
        addLane("Edge_46", 218, 224, (int) node.node_distance_formula(lab218, lab224));
        addLane("Edge_47", 219, 218, (int) node.node_distance_formula(lab219, lab218));
        addLane("Edge_48", 219, 220, (int) node.node_distance_formula(lab219, lab220));
        addLane("Edge_49", 220, 219, (int) node.node_distance_formula(lab220, lab219));
        addLane("Edge_50", 220, 208, (int) node.node_distance_formula(lab220, lab208));

        /*Dijkstra distance = new Dijkstra(1);
        
        addLane("Edge_0", 0, 1, (int) distance.distance_formula(65.00, -44.31, -19.00, -45.30, -40.60, 38.20));
        addLane("Edge_1", 0, 2, (int) distance.distance_formula(-45.30, -40.60, 38.20, -63.40, -48.00, -39.96));
        addLane("Edge_2", 0, 4, (int) distance.distance_formula(-63.40, -48.00, -39.96, -63.40, 45.00, 39.96));*/
        // Lets check from location Lab_207 to Lab_214
        Graph graph1 = new Graph(nodes, edges);
        Dijkstra dijkstra1 = new Dijkstra(graph1);
        dijkstra1.execute(nodes.get(207));
        LinkedList<Vertex> path1 = dijkstra1.getPath(nodes.get(214));

        assertNotNull(path1);
        assertTrue(path1.size() > 0);

        System.out.println("Test from lab 207 to lab 214");

        for (Vertex vertex : path1) {
            System.out.println(vertex.getName());
        }

        // Lets check from location Lab_207 to Lab_223
        Graph graph2 = new Graph(nodes, edges);
        Dijkstra dijkstra2 = new Dijkstra(graph2);
        dijkstra2.execute(nodes.get(207));
        LinkedList<Vertex> path2 = dijkstra2.getPath(nodes.get(223));

        assertNotNull(path2);
        assertTrue(path2.size() > 0);

        System.out.println("\nTest from lab 207 to lab 223");

        for (Vertex vertex : path2) {
            System.out.println(vertex.getName());
        }

    }

    private void addLane(String laneId, int sourceLocNo, int destLocNo,
            int duration) {
        Edge lane = new Edge(laneId, nodes.get(sourceLocNo), nodes.get(destLocNo), duration);
        edges.add(lane);
    }
}
