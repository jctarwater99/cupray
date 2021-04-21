//package QRGenerator;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.Scanner;
import java.io.*;

public class QRToolv2 {
    public static void main(String[] args) {
        try {
            int numPerCode = 1;
            System.out.print("How many requests per code? ");
            Scanner scan = new Scanner(System.in);
            numPerCode = scan.nextInt();
            scan.nextLine();
            System.out.print("File name: ");
            String fileName = scan.next();
            scan.nextLine();
            File dir = new File("./Requests");
            dir.mkdir();
            File f = new File("./" + fileName);
            BufferedReader br = new BufferedReader(new FileReader(f));
            String subject = "";
            String description = "";
            String json = "cupray{\"multi\":[";
            int count = 0;
            int numCodes = 1;
            while ((subject = br.readLine()) != null) {
                description = br.readLine();
                if (count > 0) json += ",";
                json += "{\"subject\": \"" + subject + "\", \"description\": \"" + description + "\"}";
                count++;
                if (count == numPerCode) {
                    count = 0;
                    json += "]}";
                    Generator.createQRFile(json, "./qr" + numCodes + ".png");
                    numCodes++;
                    json = "cupray{\"multi\":[";
                }
                //Generator.createQRFile(description, "./Requests/" + subject + "/" + subject + ".png");
            }
            if (count > 0) {
                json += "]}";
                Generator.createQRFile(json, "./qr" + numCodes + ".png");
            }
            br.close();
            scan.close();
        } catch (IOException blah) {
            System.out.println(blah);
        }
    }
}
