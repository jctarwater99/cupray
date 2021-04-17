
// Used example from https://crunchify.com/java-simple-qr-code-generator-example/#disqus_thread

import com.google.zxing.BarcodeFormat;
import com.google.zxing.EncodeHintType;
import com.google.zxing.WriterException;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.QRCodeWriter;
import com.google.zxing.qrcode.decoder.ErrorCorrectionLevel;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.util.EnumMap;
import java.util.Map;

public class Generator {
    public static void createQRFile(String content, String filePath) {
        int size = 512;
        String fileType = "png";
        File f = new File(filePath);
        try {
            Map<EncodeHintType, Object> hintType = new EnumMap<EncodeHintType, Object>(EncodeHintType.class);
            hintType.put(EncodeHintType.CHARACTER_SET, "UTF-8");

            hintType.put(EncodeHintType.MARGIN, 1);
            Object put = hintType.put(EncodeHintType.ERROR_CORRECTION, ErrorCorrectionLevel.H);

            QRCodeWriter myQRCodeWriter = new QRCodeWriter();
            BitMatrix bitMatrix = myQRCodeWriter.encode(content, BarcodeFormat.QR_CODE, size, size, hintType);
            int width = bitMatrix.getWidth();

            BufferedImage image = new BufferedImage(width, width, BufferedImage.TYPE_INT_RGB);

            image.createGraphics();

            Graphics2D g = (Graphics2D) image.getGraphics();
            g.setColor(Color.white);
            
            g.fillRect(0, 0, width, width);

            g.setColor(Color.black);
            
            for (int i = 0; i < width; i++) {
                for (int j = 0; j < width; j++) {
                    if (bitMatrix.get(i, j)) {
                        g.fillRect(i, j, 1, 1);
                    }
                }
            }

            ImageIO.write(image, fileType, f);

            //System.out.println("\n Congraturlation.. You have successfully created QR Code.. \n" +
            //                   "Check your code here: " + filePath);
        } catch (WriterException e) {
            System.out.println("\nSorry.. Something went wrong...\n");
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}