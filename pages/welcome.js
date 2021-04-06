import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Image, TouchableOpacity, Dimensions } from "react-native";
import { StyleSheet, Text, View } from "react-native";
import { createDatabase } from "../database/create";
import * as queries from "../database/query";
import * as Notifications from "expo-notifications";
import * as bookKeeping from "../database/bookKeeping";
import styles from '../styles';

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
            a prayer reminder app to strengthen your quiet time
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


export default WelcomeScreen;
