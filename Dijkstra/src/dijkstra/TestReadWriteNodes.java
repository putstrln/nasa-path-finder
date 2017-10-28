/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package dijkstra;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Scanner;

/**
 *
 * @author jadov
 */
public class TestReadWriteNodes {
    
        public static void main(String[] args) throws FileNotFoundException {
            final String FILENAME1 = "D:\\Java\\Dijkstra\\src\\dijkstra\\S0HANDHOLDS.txt";
            final String FILENAME2 = "D:\\Java\\Dijkstra\\src\\dijkstra\\LABHANDHOLDS.txt";
            File file1 = new File("D:\\Java\\Dijkstra\\src\\dijkstra\\S0HANDHOLDS.str");
            File file2 = new File("D:\\Java\\Dijkstra\\src\\dijkstra\\LABHANDHOLDS.str");
                        
            BufferedWriter bw1 = null;
            BufferedWriter bw2 = null;
            FileWriter fw1 = null;
            FileWriter fw2 = null;
            
            try {
            Scanner inputFile = new Scanner(file1);
            
            fw1 = new FileWriter(FILENAME1);
            bw1 = new BufferedWriter(fw1);
            
            while (inputFile.hasNext()) {
                Node node = new Node(inputFile.nextLine(), inputFile.nextLine(), 
                        Double.parseDouble(inputFile.next()), Double.parseDouble(inputFile.next()),
                        Double.parseDouble(inputFile.nextLine()), Double.parseDouble(inputFile.next()),
                        Double.parseDouble(inputFile.next()), Double.parseDouble(inputFile.nextLine()),
                        inputFile.nextLine());
                for (int i = 0; i < 1; i++) {
                ArrayList<Node> s0HandHoldNodeList = new ArrayList<>();
                s0HandHoldNodeList.add(node);
                System.out.println(s0HandHoldNodeList);
                }
                
                bw1.write(node.toString());
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
            
            try {
            Scanner inputFile = new Scanner(file2);
            
            fw2 = new FileWriter(FILENAME2);
            bw2 = new BufferedWriter(fw2);
            
            while (inputFile.hasNext()) {
                Node node = new Node(inputFile.nextLine(), inputFile.nextLine(), 
                        Double.parseDouble(inputFile.next()), Double.parseDouble(inputFile.next()),
                        Double.parseDouble(inputFile.nextLine()), Double.parseDouble(inputFile.next()),
                        Double.parseDouble(inputFile.next()), Double.parseDouble(inputFile.nextLine()),
                        inputFile.nextLine());
                for (int i = 0; i < 1; i++) {
                ArrayList<Node> labHandHoldNodeList = new ArrayList<>();
                labHandHoldNodeList.add(node);
                System.out.println(labHandHoldNodeList);
                }
                
                bw2.write(node.toString());
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
    }
    
}
