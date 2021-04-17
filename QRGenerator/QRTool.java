//package QRGenerator;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.Scanner;
import java.io.*;
import com.fasterxml.jackson.core.*;

public class QRTool {
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
            while ((subject = br.readLine()) != null) {
                description = br.readLine();
                subject = subject.replaceAll("/", " & ");
                File curDir = new File("./Requests/" + subject);
                curDir.mkdir();
                File reqFile = new File("./Requests/" + subject + "/" + subject + ".txt");
                reqFile.createNewFile();
                FileWriter w = new FileWriter("./Requests/" + subject + "/" + subject + ".txt");
                w.write(subject + "\n" + description);
                Generator.createQRFile(description, "./Requests/" + subject + "/" + subject + ".png");
                w.close();
            }
            br.close();
            scan.close();
        } catch (IOException blah) {
            System.out.println(blah);
        }
    }
}
