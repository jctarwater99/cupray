import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";

var { height, width } = Dimensions.get("window");

const Scanner = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);

    if (data.substring(0, 6) == "cupray") {
      data = data.substring(6);
      let request = JSON.parse(data);
      if (request.multi != undefined) {
        navigation.navigate("MultiScanner", {
          reqs: data,
        });
      } else {
        navigation.navigate("IndividualRequest", {
          cat_name: "Select",
          req_id: -1,
          isNewReq: true,
          subject: request.subject,
          description: request.description,
        });
      }
    } else {
      alert(`This qr code does not represent a valid GOPray request`);
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {!scanned && (
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={() => setScanned(false)}
        >
          <Text style={styles.prayButton}>
            Scan QR or Swipe from Left to view Menu
          </Text>
        </TouchableOpacity>
      )}
      {scanned && (
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={() => setScanned(false)}
        >
          <Text style={styles.prayButton}>Tap to Scan Again</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },

  buttonStyle: {
    width: width * 0.7,
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: "#e8e7e4",
    marginBottom: height * 0.16,
    padding: width * 0.05,
  },

  prayButton: {
    color: "#003a63",
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
  },
});

export default Scanner;
