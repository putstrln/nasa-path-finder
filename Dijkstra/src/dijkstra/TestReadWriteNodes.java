/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package dijkstra;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintStream;
import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Scanner;

/**
 *
 * @author jadov
 */
public class TestReadWriteNodes {
    
        public static void main(String[] args) throws FileNotFoundException {
            final String FILENAME1 = "D:\\Java\\Dijkstra\\src\\dijkstra\\S0HANDHOLDS.txt";
            final String FILENAME2 = "D:\\Java\\Dijkstra\\src\\dijkstra\\LABHANDHOLDS.txt";
            final String FILENAME3 = "D:\\Java\\Dijkstra\\src\\dijkstra\\S0HANDHOLDSDISTANCES.txt";
            final String FILENAME4 = "D:\\Java\\Dijkstra\\src\\dijkstra\\LABHANDHOLDSDISTANCES.txt";
            File file1 = new File("D:\\Java\\Dijkstra\\src\\dijkstra\\S0HANDHOLDS.str");
            File file2 = new File("D:\\Java\\Dijkstra\\src\\dijkstra\\LABHANDHOLDS.str");
            
            Node s0Node = new Node();
            Node labNode = new Node();
            ArrayList<Node> s0HandHoldNodeList = new ArrayList<>();
            ArrayList<Node> labHandHoldNodeList = new ArrayList<>();
            double s0NodeDist;
            String s0NodeDistString;
            double labNodeDist;
            String labNodeDistString;
            
            BufferedWriter bw1 = null;
            BufferedWriter bw2 = null;
            BufferedWriter bw3 = null;
            BufferedWriter bw4 = null;
            FileWriter fw1 = null;
            FileWriter fw2 = null;
            FileWriter fw3 = null;
            FileWriter fw4 = null;
            
            try {
            Scanner inputFile = new Scanner(file1);
            
            fw1 = new FileWriter(FILENAME1);
            bw1 = new BufferedWriter(fw1);
            
            while (inputFile.hasNext()) {
                s0Node = new Node(inputFile.nextLine(), inputFile.nextLine(), 
                        Double.parseDouble(inputFile.next()), Double.parseDouble(inputFile.next()),
                        Double.parseDouble(inputFile.nextLine()), Double.parseDouble(inputFile.next()),
                        Double.parseDouble(inputFile.next()), Double.parseDouble(inputFile.nextLine()),
                        inputFile.nextLine());
                
                s0HandHoldNodeList.add(s0Node);
                bw1.write(s0Node.toString() + "\r\n");
            }        
            } catch (IOException e) {
                e.printStackTrace();
            } finally {
                try {
                    if (bw1 != null)
                        bw1.close();
                    if (fw1 != null)
                        fw1.close();
                } catch (IOException ex) {
                    ex.printStackTrace();
                }
            } 
            
            System.out.println("s0HandHoldNodeList size = " + s0HandHoldNodeList.size());
            System.out.println("s0HandHoldNodeList distance possibilities = " + s0HandHoldNodeList.size() * s0HandHoldNodeList.size());
            
            try {
            Scanner inputFile = new Scanner(file2);
            
            fw2 = new FileWriter(FILENAME2);
            bw2 = new BufferedWriter(fw2);
            
            while (inputFile.hasNext()) {
                labNode = new Node(inputFile.nextLine(), inputFile.nextLine(), 
                        Double.parseDouble(inputFile.next()), Double.parseDouble(inputFile.next()),
                        Double.parseDouble(inputFile.nextLine()), Double.parseDouble(inputFile.next()),
                        Double.parseDouble(inputFile.next()), Double.parseDouble(inputFile.nextLine()),
                        inputFile.nextLine());
                
                labHandHoldNodeList.add(labNode);             
                bw2.write(labNode.toString() + "\r\n");
            }        
            } catch (IOException e) {
                e.printStackTrace();
            } finally {
                try {
                    if (bw2 != null)
                        bw2.close();
                    if (fw2 != null)
                        fw2.close();
                } catch (IOException ex) {
                    ex.printStackTrace();
                }
            }
            
            System.out.println("labHandHoldNodeList size = " + labHandHoldNodeList.size()); 
            System.out.println("labHandHoldNodeList distance possibilities = " + labHandHoldNodeList.size() * labHandHoldNodeList.size());
            
            try {
                        
            fw3 = new FileWriter(FILENAME3);
            bw3 = new BufferedWriter(fw3);
                      
            for (int i = 0; i < s0HandHoldNodeList.size(); i++) {
                for (int j = 0; j < s0HandHoldNodeList.size(); j++) {
                s0NodeDist = s0Node.node_distance_formula(s0HandHoldNodeList.get(i), s0HandHoldNodeList.get(j));
                s0NodeDistString = "Distance from node " + s0HandHoldNodeList.get(i).getNodeId() + " to node " 
                        + s0HandHoldNodeList.get(j).getNodeId() + " is: " + s0NodeDist + "\r\n";
                bw3.write(s0NodeDistString);
                }
            }
            
            } catch (IOException e) {
                e.printStackTrace();
            } finally {
                try {
                    if (bw3 != null)
                        bw3.close();
                    if (fw3 != null)
                        fw3.close();
                } catch (IOException ex) {
                    ex.printStackTrace();
                }
            }            
            
            try {
                        
            fw4 = new FileWriter(FILENAME4);
            bw4 = new BufferedWriter(fw4);
                      
            for (int i = 0; i < labHandHoldNodeList.size(); i++) {
                for (int j = 0; j < labHandHoldNodeList.size(); j++) {
                labNodeDist = labNode.node_distance_formula(labHandHoldNodeList.get(i), labHandHoldNodeList.get(j));
                labNodeDistString = "Distance from node " + labHandHoldNodeList.get(i).getNodeId() + " to node " 
                        + labHandHoldNodeList.get(j).getNodeId() + " is: " + labNodeDist + "\r\n";
                bw4.write(labNodeDistString);
                }
            }
            
            } catch (IOException e) {
                e.printStackTrace();
            } finally {
                try {
                    if (bw4 != null)
                        bw4.close();
                    if (fw4 != null)
                        fw4.close();
                } catch (IOException ex) {
                    ex.printStackTrace();
                }
            }
            
    }
    
}
