import React, { useEffect, useState } from "react";
import { Image, TouchableOpacity, Dimensions, FlatList } from "react-native";
import { StyleSheet, Button, Text, View } from "react-native";
import * as queries from "../database/query";
import { checkBooks } from "../database/bookKeeping";

var { height, width } = Dimensions.get("window");

const Dashboard = ({ navigation }) => {
  useEffect(() => {
    checkBooks();
  }, []);

  return (
    <View style={styles.dashboardContainer}>
      <View style={{flexDirection: "row" }}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Image
            style={{
              marginRight: width * 0.05,
              marginTop: height * 0.015,
              width: 30,
              height: 30,
              resizeMode: "contain",
            }}
            source={require("../assets/hamburger.png")}
          ></Image>
        </TouchableOpacity>
        <Text style={styles.title}>
          Home<Text style={styles.titleAccent}>.</Text>
        </Text>
      </View>
      <View style={styles.verseContainer}>
        <Text style={styles.verseOf}>Pray Without Ceasing</Text>
        <View style={styles.lineStyle} />
        <Text style={styles.nowMay}>
          "Rejoice always, pray without ceasing, in everything give thanks; for
          this is the will of God in Christ Jesus for you." {"\n"}1
          Thessalonians 5:16-18
        </Text>
      </View>
      <View style={{ flex: 0.12 }}></View>
      <View style={[styles.iconRow]}>
        <View style={{ marginRight: width * 0.11 }}>
          <TouchableOpacity
            style={styles.icon}
            onPress={() => {
              navigation.navigate("Cat");
            }}
          >
            <Image
              style={styles.dashImage}
              source={require("../assets/journal.png")}
            />
          </TouchableOpacity>
          <Text style={styles.dashText}>Prayer Journal</Text>
        </View>

        <View>
          <TouchableOpacity
            style={styles.icon}
            onPress={() => navigation.navigate("Pray")}
          >
            <Image
              style={styles.dashImage}
              source={require("../assets/prayer_hands.png")}
            />
          </TouchableOpacity>
          <Text style={styles.dashText}>Prayer Time</Text>
        </View>
      </View>
      <View style={[styles.iconRow, { marginTop: height * 0.03}]}>
        <View style={{ marginRight: width * 0.11 }}>
          <TouchableOpacity
            style={styles.icon}
            onPress={() => navigation.navigate("Scan QR Code")}
          >
            <Image
              style={styles.dashImage}
              source={require("../assets/QRCode.png")}
            />
          </TouchableOpacity>
          <Text style={styles.dashText}>Scan QR Code</Text>
        </View>

        <View>
          <TouchableOpacity
            style={styles.icon}
            onPress={() => {
              navigation.navigate("IndividualRequest", {
                cat_name: "Category",
                req_id: -1,
                isNewReq: true,
                fromDash: true,
                subject: "Subject",
                description: "Description",
              });
            }}
          >
            <Image
              style={[
                styles.dashImage,
                {
                  width: width * 0.15,
                  height: height * 0.15,
                  marginTop: height * 0.01,
                  marginLeft: width * 0.1,
                },
              ]}
              source={require("../assets/plus.png")}
            />
          </TouchableOpacity>
          <Text style={styles.dashText}>Add Request</Text>
        </View>
      </View>
      <Image
          style={styles.CUlogo}
          source={require("../assets/cuLogoColor.png")}
        />
    </View>
  );
};
const styles = StyleSheet.create({
  // Overall container for screen
  dashboardContainer: {
    flex: .95,
    backgroundColor: "#EFEFEF",
    alignItems: "center",
    justifyContent: "center",
    marginTop: height * 0.06,
  },

  title: {
    flex: 0.8,
    color: "#003A63",
    fontSize: width * 0.12,
    fontWeight: "700",
    marginBottom: height * 0.01,
    marginRight: width * 0.1,
  },

  titleAccent: {
    color: "#D6C396",
    fontSize: width * 0.12,
    fontWeight: "700",
  },

  iconRow: {
    flex: 0.6,
    flexDirection: "row",
    marginBottom: height * 0.1,
  },

  icon: {
    width: width * 0.34,
    height: height * 0.16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 3.65,

    elevation: 3,
    borderRadius: 20,
    backgroundColor: "#e8e7e4",
  },

  dashImage: {
    flex: 0.95,
    marginLeft: width * 0.07,
    width: width * 0.19,
    height: height * 0.19,
    resizeMode: "contain",
  },

  dashText: {
    color: "#003a63",
    fontSize: width * 0.04,
    fontWeight: "700",
    alignSelf: "center",
    marginLeft: width * 0.01,
    marginTop: height * 0.01,
  },

  CUlogo: {
    width: width * 0.3,
    height: width * 0.09,
    opacity: 0.85,
    marginTop: height * 0.02,
  },

  verseOf: {
    width: 250,
    height: 28,
    color: "#d6c396",
    fontSize: 20,
    fontWeight: "700",
    marginTop: height * 0.03,
    textAlign: "center",
  },

  nowMay: {
    color: "#efefef",
    fontSize: width * 0.05,
    fontWeight: "100",
    textAlign: "center",
    marginTop: height * 0.02,
    marginBottom: height * 0.02,
    paddingLeft: width * 0.05,
    paddingRight: width * 0.05,
  },

  verseContainer: {
    width: width * 0.85,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.57,
    shadowRadius: 4.65,

    elevation: 6,
    borderRadius: 20,
    backgroundColor: "#003A63",
  },

  lineStyle: {
    borderWidth: 0.75,
    borderColor: "#D3D3D3",
    marginTop: height * 0.01,
    width: 270,
  },

 
});

export default Dashboard;
