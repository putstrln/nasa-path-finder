/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package dijkstra;

import java.util.List;

/**
 *
 * @author jadov
 */
public class Node {

    private String unique_node_name;
    private String geometry_file_name;
    private double x;
    private double y;
    private double z;
    private double pitch;
    private double yaw;
    private double roll;
    private String parent_node_name;
    private double s0NodeDist;
    private double labNodeDist;

    public Node() {
        unique_node_name = "nodeId";
        geometry_file_name = "node.stl";
        x = 0.0;
        y = 0.0;
        z = 0.0;
        pitch = 0.0;
        yaw = 0.0;
        roll = 0.0;
        parent_node_name = "parentNode";
    }

    public Node(String unique_node_name, String geometry_file_name, double x,
            double y, double z, double pitch, double yaw, double roll, String parent_node_name) {
        this.unique_node_name = unique_node_name;
        this.geometry_file_name = geometry_file_name;
        this.x = x;
        this.y = y;
        this.z = z;
        this.pitch = pitch;
        this.yaw = yaw;
        this.roll = roll;
        this.parent_node_name = parent_node_name;
    }

    public Node(String unique_node_name, double x, double y, double z) {
        this.unique_node_name = unique_node_name;
        this.x = x;
        this.y = y;
        this.z = z;
    }

    public void setNodeId(String unique_node_name) {
        this.unique_node_name = unique_node_name;
    }

    public String getNodeId() {
        return unique_node_name;
    }

    public void setX(double x) {
        this.x = x;
    }

    public double getX() {
        return x;
    }

    public void setY(double y) {
        this.y = y;
    }

    public double getY() {
        return y;
    }

    public void setZ(double z) {
        this.z = z;
    }

    public double getZ() {
        return z;
    }

    @Override
    public String toString() {
        return "unique_node_name: " + unique_node_name + "\r\ngeometry_file_name: "
                + geometry_file_name + "\r\nx: " + String.valueOf(x) + " y: "
                + String.valueOf(y) + " z: " + String.valueOf(z) + "\r\npitch: "
                + String.valueOf(pitch) + " yaw: " + String.valueOf(yaw) + " roll: "
                + String.valueOf(roll) + "\r\nparent_node_name: " + parent_node_name + "\r\n";
    }

    public double node_distance_formula(Node node1, Node node2) {

        double x1 = node1.getX();
        double x2 = node2.getX();

        double y1 = node1.getY();
        double y2 = node2.getY();

        double z1 = node1.getZ();
        double z2 = node2.getZ();

        double xDist = Math.pow((x2 - x1), 2);
        double yDist = Math.pow((y2 - y1), 2);
        double zDist = Math.pow((z2 - z1), 2);

        double node_distance = Math.sqrt(xDist + yDist + zDist);

        return node_distance;

    }

    public void get_node_neighbors(String nodeId) {
        Node node1 = new Node();
        CreateNodes cn = new CreateNodes();
        cn.createS0HandHoldNodeList();
        cn.createLabHandholdNodeList();
        List<Node> s0HandHolds = cn.getS0HandHoldNode();
        List<Node> labHandHolds = cn.getLabHandHoldNode();
        for (int i = 0; i < s0HandHolds.size(); i++) {
            if (s0HandHolds.get(i).getNodeId().equals(nodeId)) {
                for (int j = 0; j < s0HandHolds.size(); j++) {
                    s0NodeDist = node1.node_distance_formula(s0HandHolds.get(i), s0HandHolds.get(j));
                    //need to figure out how to only cpature 4 closest nodes
                    if (s0NodeDist > 0 && s0NodeDist <= 50) {
                        System.out.println("Node " + s0HandHolds.get(i).getNodeId() 
                                + " to node " + s0HandHolds.get(j).getNodeId() + " distance = " + s0NodeDist);
                    } 
                }
            }
        }
        for (int i = 0; i < labHandHolds.size(); i++) {
            if (labHandHolds.get(i).getNodeId().equals(nodeId)) {
                for (int j = 0; j < labHandHolds.size(); j++) {
                    labNodeDist = node1.node_distance_formula(labHandHolds.get(i), labHandHolds.get(j));
                    //need to figure out how to only capture 4 closest nodes
                    if (labNodeDist > 0 && labNodeDist <= 60) {
                        System.out.println("Node " + labHandHolds.get(i).getNodeId() 
                                + " to node " +  labHandHolds.get(j).getNodeId() + " distance = " + labNodeDist);
                    } 
                }
            }
        }     
    }
}
