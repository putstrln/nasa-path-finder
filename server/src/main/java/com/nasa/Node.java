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
 * Project: NASA Path in conjunction with University of Maryland University College
 * @author jadovan
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

    protected Node() {
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

    protected Node(String unique_node_name, String geometry_file_name, double x,
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

    protected Node(String unique_node_name, double x, double y, double z) {
        this.unique_node_name = unique_node_name;
        this.x = x;
        this.y = y;
        this.z = z;
    }

    protected Node(String unique_node_name) {
        this.unique_node_name = unique_node_name;
    }

    protected void setNodeId(String unique_node_name) {
        this.unique_node_name = unique_node_name;
    }

    protected String getNodeId() {
        return unique_node_name;
    }

    protected void setX(double x) {
        this.x = x;
    }

    protected double getX() {
        return x;
    }

    protected void setY(double y) {
        this.y = y;
    }

    protected double getY() {
        return y;
    }

    protected void setZ(double z) {
        this.z = z;
    }

    protected double getZ() {
        return z;
    }

    protected double node_distance_formula(Node node1, Node node2) {

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

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((unique_node_name == null) ? 0 : unique_node_name.hashCode());
        return result;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null) {
            return false;
        }
        if (getClass() != obj.getClass()) {
            return false;
        }
        Node other = (Node) obj;
        if (unique_node_name == null) {
            if (other.unique_node_name != null) {
                return false;
            }
        } else if (!unique_node_name.equals(other.unique_node_name)) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "unique_node_name: " + unique_node_name + "\r\ngeometry_file_name: "
                + geometry_file_name + "\r\nx: " + String.valueOf(x) + " y: "
                + String.valueOf(y) + " z: " + String.valueOf(z) + "\r\npitch: "
                + String.valueOf(pitch) + " yaw: " + String.valueOf(yaw) + " roll: "
                + String.valueOf(roll) + "\r\nparent_node_name: " + parent_node_name + "\r\n";
    }

}
