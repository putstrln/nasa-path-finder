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

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

/**
 * Project: NASA Path in conjunction with University of Maryland University
 * College
 *
 * @author jadovan
 */
public class CreateNodes extends Node {
    /**
    * The following two file locations must be changed to the directory where the user wants
    * the files to be saved
    */
    private final String FILENAME5 = "D:\\Java\\Dijkstra\\src\\dijkstra\\S0LABHANDHOLDS.txt";
    private final String FILENAME6 = "D:\\Java\\Dijkstra\\src\\dijkstra\\S0LABHANDHOLDSDISTANCES.txt";
    /**
    * The following two file locations must be changed to the user's current directory
    * where the files are saved on their computer, server, etc.
    */
    File file1 = new File("D:\\Java\\Dijkstra\\src\\dijkstra\\S0HANDHOLDS.str");
    File file2 = new File("D:\\Java\\Dijkstra\\src\\dijkstra\\LABHANDHOLDS.str");

    Node s0Node = new Node();
    Node labNode = new Node();
    Node s0LabNode = new Node();
    List<Node> s0HandHoldNodeList = new ArrayList<>();
    List<String> s0HandHoldNodeIndexList = new ArrayList<>();
    List<Node> labHandHoldNodeList = new ArrayList<>();
    List<String> labHandHoldNodeIndexList = new ArrayList<>();
    List<Node> s0LabHandHoldNodeList = new ArrayList<>();
    List<String> s0LabHandHoldNodeIndexList = new ArrayList<>();

    private double s0LabNodeDist;
    private String s0LabNodeDistString;

    private BufferedWriter bw5 = null;
    private BufferedWriter bw6 = null;

    private FileWriter fw5 = null;
    private FileWriter fw6 = null;

    public void createS0LabHandHoldNodeList() {

        try {
            Scanner inputFile1 = new Scanner(file1);
            Scanner inputFile2 = new Scanner(file2);

            fw5 = new FileWriter(FILENAME5);
            bw5 = new BufferedWriter(fw5);

            while (inputFile1.hasNext()) {

                s0Node = new Node(inputFile1.nextLine(), inputFile1.nextLine(),
                        Double.parseDouble(inputFile1.next()), Double.parseDouble(inputFile1.next()),
                        Double.parseDouble(inputFile1.nextLine()), Double.parseDouble(inputFile1.next()),
                        Double.parseDouble(inputFile1.next()), Double.parseDouble(inputFile1.nextLine()),
                        inputFile1.nextLine());

                bw5.write(s0Node.toString() + "\r\n");
                s0LabHandHoldNodeList.add(s0Node);
                s0LabHandHoldNodeIndexList.add(s0Node.getNodeId());
            }
            while (inputFile2.hasNext()) {

                labNode = new Node(inputFile2.nextLine(), inputFile2.nextLine(),
                        Double.parseDouble(inputFile2.next()), Double.parseDouble(inputFile2.next()),
                        Double.parseDouble(inputFile2.nextLine()), Double.parseDouble(inputFile2.next()),
                        Double.parseDouble(inputFile2.next()), Double.parseDouble(inputFile2.nextLine()),
                        inputFile2.nextLine());

                bw5.write(labNode.toString() + "\r\n");
                s0LabHandHoldNodeList.add(labNode);
                s0LabHandHoldNodeIndexList.add(labNode.getNodeId());
            }

        } catch (IOException e) {
            e.getStackTrace();
        } finally {
            try {
                if (bw5 != null) {
                    bw5.close();
                }
                if (fw5 != null) {
                    fw5.close();
                }
            } catch (IOException ex) {
                ex.getStackTrace();
            }
        }

    }

    public List getS0LabHandHoldNodeList() {
        return s0LabHandHoldNodeList;
    }

    public void createS0LabHandHoldNodeListDistances() {

        try {

            fw6 = new FileWriter(FILENAME6);
            bw6 = new BufferedWriter(fw6);

            for (int i = 0; i < s0LabHandHoldNodeList.size(); i++) {
                for (int j = 0; j < s0LabHandHoldNodeList.size(); j++) {
                    s0LabNodeDist = s0LabNode.node_distance_formula(s0LabHandHoldNodeList.get(i), s0LabHandHoldNodeList.get(j));
                    s0LabNodeDistString = "Distance from node " + s0LabHandHoldNodeList.get(i).getNodeId() + " to node "
                            + s0LabHandHoldNodeList.get(j).getNodeId() + " is: " + s0LabNodeDist + "\r\n";
                    bw6.write(s0LabNodeDistString);
                }
            }

        } catch (IOException e) {
            e.getStackTrace();
        } finally {
            try {
                if (bw6 != null) {
                    bw6.close();
                }
                if (fw6 != null) {
                    fw6.close();
                }
            } catch (IOException ex) {
                ex.getStackTrace();
            }
        }
    }

    /* *************************************************************************
    * The following are only needed if wanting to create each type of
    * seperate node .txt file

    private final String FILENAME1 = "D:\\Java\\Dijkstra\\src\\dijkstra\\S0HANDHOLDS.txt";
    private final String FILENAME2 = "D:\\Java\\Dijkstra\\src\\dijkstra\\LABHANDHOLDS.txt";
    private final String FILENAME3 = "D:\\Java\\Dijkstra\\src\\dijkstra\\S0HANDHOLDSDISTANCES.txt";
    private final String FILENAME4 = "D:\\Java\\Dijkstra\\src\\dijkstra\\LABHANDHOLDSDISTANCES.txt";
    private double s0NodeDist;
    private String s0NodeDistString;
    private double labNodeDist;
    private String labNodeDistString;
    private BufferedWriter bw1 = null;
    private BufferedWriter bw2 = null;
    private BufferedWriter bw3 = null;
    private BufferedWriter bw4 = null;
    private FileWriter fw1 = null;
    private FileWriter fw2 = null;
    private FileWriter fw3 = null;
    private FileWriter fw4 = null;

    ************************************************************************** */

 /* *************************************************************************
    * The following methods only need to be utilized if wanting to create the
    * files for each separate node type and Arraylists for each node type.

    public void createS0HandHoldNodeList() {

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

                bw1.write(s0Node.toString() + "\r\n");
                s0HandHoldNodeList.add(s0Node);
                s0HandHoldNodeIndexList.add(s0Node.getNodeId());
            }

        } catch (IOException e) {
            e.getStackTrace();
        } finally {
            try {
                if (bw1 != null) {
                    bw1.close();
                }
                if (fw1 != null) {
                    fw1.close();
                }
            } catch (IOException ex) {
                ex.getStackTrace();
            }
        }

    }

    public List getS0HandHoldNodeList() {
        return s0HandHoldNodeList;
    }

    public void createLabHandholdNodeList() {

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

                bw2.write(labNode.toString() + "\r\n");
                labHandHoldNodeList.add(labNode);
                labHandHoldNodeIndexList.add(labNode.getNodeId());
            }
        } catch (IOException e) {
            e.getStackTrace();
        } finally {
            try {
                if (bw2 != null) {
                    bw2.close();
                }
                if (fw2 != null) {
                    fw2.close();
                }
            } catch (IOException ex) {
                ex.getStackTrace();
            }
        }

    }

    public List getLabHandHoldNode() {
        return labHandHoldNodeList;
    }

    public void createS0HandHoldNodeListDistances() {

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
            e.getStackTrace();
        } finally {
            try {
                if (bw3 != null) {
                    bw3.close();
                }
                if (fw3 != null) {
                    fw3.close();
                }
            } catch (IOException ex) {
                ex.getStackTrace();
            }
        }

    }

    public double getS0HandHoldNodeDistances() {
        return s0NodeDist;
    }

    public void createLabHandHoldNodeListDistances() {

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
            e.getStackTrace();
        } finally {
            try {
                if (bw4 != null) {
                    bw4.close();
                }
                if (fw4 != null) {
                    fw4.close();
                }
            } catch (IOException ex) {
                ex.getStackTrace();
            }
        }
    }

    ************************************************************************* */
}
