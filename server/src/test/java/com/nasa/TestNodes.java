/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package dijkstra;

import java.io.FileNotFoundException;
import java.util.Scanner;

/**
 *
 * @author jadov
 */
public class TestNodes {

    public static void main(String[] args) throws FileNotFoundException {

        CreateNodes cn = new CreateNodes();

        cn.createS0HandHoldNodeList();
        cn.createLabHandholdNodeList();
        cn.createS0HandHoldNodeListDistances();
        cn.createLabHandHoldNodeListDistances();
        Node s0Node = new Node();
        Scanner scan = new Scanner(System.in);
        System.out.println("Enter source node: ");
        String nodeId1 = scan.next();

        s0Node.get_node_neighbors(nodeId1);
    }
}
