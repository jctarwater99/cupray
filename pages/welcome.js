import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Image, TouchableOpacity, Dimensions, FlatList } from "react-native";
import { StyleSheet, Button, Text, View } from "react-native";
import { populateDB, populateMinimum } from "../database/populate";
import { createDatabase, dropForTesting } from "../database/create";
import * as queries from "../database/query";
import * as updates from "../database/update";
import * as Notifications from "expo-notifications";
import { updateRequest } from "../database/update";
import * as bookKeeping from "../database/bookKeeping";

// Ignoring potential problems
import { LogBox } from "react-native";
LogBox.ignoreLogs([
  "Your project is accessing the following APIs from a deprecated global rather than a module import: Constants (expo-constants).",
]);

var { height, width } = Dimensions.get("window");

async function requestPermissionsAsync() {
  return await Notifications.requestPermissionsAsync({
    ios: {
      allowAlert: true,
      allowBadge: true,
      allowSound: true,
      allowAnnouncements: true,
    },
  });
}

const WelcomeScreen = ({ navigation }) => {
  let [tapCount, setTapCount] = useState(0);

  useEffect(() => {
    createDatabase();
    queries.checkIfPopMinRan();
  }, []);

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });
  return (
    <View style={styles.welcomeContainer}>
      <View style={styles.contentContainer}>
        <Image
          style={styles.pray}
          source={require("../assets/cupray_logo.png")}
        />
        <Text style={styles.cu}>
          GO<Text style={styles.cupray}>Pray.</Text>
        </Text>
        <View style={{ marginBottom: height * 0.09 }}>
          <Text
            style={styles.thePrayer}
            onPress={() => {
              if (tapCount >= 10) {
                navigation.navigate("TempDash");
              } else {
                setTapCount(tapCount + 1);
              }
            }}
          >
            A prayer reminder app to strengthen your quiet time
          </Text>
        </View>
        <View style={{ flex: 1, justifyContent: "flex-end" }}>
          <TouchableOpacity
            style={styles.bbutton}
            onPress={() => {
              requestPermissionsAsync();
              bookKeeping.checkBooks();
              navigation.navigate("Dash");
            }}
          >
            <Text style={styles.prayButton}>Let's Start Praying</Text>
          </TouchableOpacity>
        </View>
      </View>
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  welcomeContainer: {
    flex: 1,
    backgroundColor: "#003a63",
    alignItems: "center",
    justifyContent: "center",
  },

  contentContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: height * 0.24,
  },

  pray: {
    width: width * 0.5,
    height: width * 0.5,
    resizeMode: "contain",
  },

  cu: {
    color: "#efefef",
    fontSize: width * 0.16,
    fontWeight: "700",
    textAlign: "center",
  },

  cupray: {
    color: "#d6c396",
    fontSize: width * 0.16,
    fontWeight: "700",
    textAlign: "center",
  },

  thePrayer: {
    color: "#d6c396",
    fontSize: 19,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: height * 0.3,
    paddingLeft: 30,
    paddingRight: 30,
  },

  bbutton: {
    width: width * 0.7,
    height: 61,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
    borderRadius: 20,
    backgroundColor: "#e8e7e4",
    marginBottom: height * 0.16,
  },

  prayButton: {
    color: "#003a63",
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
    marginTop: 18,
  },
});

export default WelcomeScreen;
