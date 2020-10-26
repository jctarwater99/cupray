import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Image, TouchableOpacity, Dimensions, FlatList } from "react-native";
import { StyleSheet, Button, Text, View } from "react-native";
import { populateDB } from "../database/populate";
import { createDatabase, dropForTesting } from "../database/create";
import * as queries from "../database/query";

const WelcomeScreen = ({ navigation }) => {
  return (
    <View style={styles.welcomeContainer}>
      <Image style={styles.pray} source={require("../assets/pray.png")} />

      <Text style={styles.cu}>
        CU<Text style={styles.cupray}>Pray.</Text>
      </Text>
      <Text
        style={styles.thePrayer}
        onPress={() => {
          //dropForTesting();
          queries.testQuery();
        }}
      >
        The prayer journal app for your 1000 days
      </Text>
      <View style={{ flex: 1, justifyContent: "flex-end" }}>
        <TouchableOpacity
          style={styles.bbutton}
          onPress={() => {
            dropForTesting();
            createDatabase();
            populateDB();
            navigation.navigate("Dash");
          }}
        >
          <Text style={styles.prayButton}>Let's Start Praying</Text>
        </TouchableOpacity>
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

  pray: {
    width: 74,
    height: 103,
    marginTop: 200,
  },

  cu: {
    color: "#efefef",
    width: 233,
    height: 82,
    fontSize: 59,
    fontWeight: "700",
    textAlign: "center",
  },

  cupray: {
    width: 233,
    height: 82,
    color: "#d6c396",
    fontSize: 59,
    fontWeight: "700",
    textAlign: "center",
  },

  thePrayer: {
    width: 219,
    height: 53,
    color: "#d6c396",
    fontSize: 19,
    fontWeight: "700",
    textAlign: "center",
    marginTop: -10,
  },

  bbutton: {
    width: 244,
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
    marginBottom: 100,
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
