/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.nasa;

import java.util.ArrayList;
import java.util.Iterator;

/**
 *
 * @author jadov
 */
public class TestDistance {
    
    public static void main(String[] args) {
        Node node1 = new Node("S0_3494", 65.00, -44.31, -19.00);
        Node node2 = new Node("S0_3480", -45.30, -40.60, 38.20);
        Node node3 = new Node("S0_3495", -63.40, -48.00, -39.96);
        Node node4 = new Node("S0_3482", 63.40, 45.00, 39.96);     
        
        TestDijkstra tdjk = new TestDijkstra();
        tdjk.testExecute();
                
    }
    
}
