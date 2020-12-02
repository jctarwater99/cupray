import React, { useState } from "react";
import { Image, TouchableOpacity, Dimensions, FlatList } from "react-native";
import { StyleSheet, Button, Text, View } from "react-native";
import * as queries from "../database/query";

var { height, width } = Dimensions.get("window");

const Dashboard = ({ navigation }) => {
  return (
    <View style={styles.dashboardContainer}>
      <Text style={styles.title}>
        Home<Text style={styles.titleAccent}>.</Text>
      </Text>

      <View style={styles.verseContainer}>
        <Text style={styles.verseOf}>Pray Without Ceasing</Text>
        <View style={styles.lineStyle} />
        <Text style={styles.nowMay}>
          "Rejoice always, pray without ceasing, in everything give thanks; 
          for this is the will of God in Christ Jesus for you." {'\n'}1 Thessalonians 5:16-18
        </Text>
      </View>
      <View style={{ flex: 0.1 }}></View>
      <View style={styles.iconRow}>
        <View style={{ marginRight: width * 0.1 }}>
          <TouchableOpacity
            style={styles.icon}
            onPress={() => navigation.navigate("Cat")}
          >
            <Image
              style={styles.dashImage}
              source={require("../assets/journal2.png")}
            />
          </TouchableOpacity>
          <Text style={styles.dashText}>Prayer Journal</Text>
        </View>

        <View>
          <TouchableOpacity style={styles.icon} onPress={() => void 0}>
            <Image
              style={styles.dashImage}
              source={require("../assets/pray_blue.png")}
            />
          </TouchableOpacity>
          <Text style={styles.dashText}>Prayer Time</Text>
        </View>
      </View>
      <View style={styles.iconRow}>
        <View style={{ marginRight: width * 0.1 }}>
          <TouchableOpacity style={styles.icon}>
            <Image
              style={styles.dashImage}
              source={require("../assets/journal1.png")}
            />
          </TouchableOpacity>
          <Text style={styles.dashText}>Scripture</Text>
        </View>

        <View>
          <TouchableOpacity
            style={styles.icon}
            onPress={() => {
              navigation.navigate("ThisRequest", {
                cat_id: 1,
                cat_name: "Category",
                req_id: 1,
                isNewReq: true,
              });
            }}
          >
            <Image
              style={[styles.dashImage, { marginLeft: width * 0.13 }]}
              source={require("../assets/plus.png")}
            />
          </TouchableOpacity>
          <Text style={styles.dashText}>Add Request</Text>
        </View>
      </View>
      <View style={{ marginBottom: height * 0.05 }}>
        <Image
          style={styles.CUlogo}
          source={require("../assets/cuLogoColor.png")}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  // Overall container for screen
  dashboardContainer: {
    flex: 1,
    backgroundColor: "#EFEFEF",
    alignItems: "center",
    justifyContent: "center",
    marginTop: height * 0.08,
  },

  title: {
    flex: 0.3,
    color: "#003A63",
    fontSize: 46,
    fontWeight: "700",
    marginBottom: height * 0.01,
    marginRight: width * 0.5,
  },

  titleAccent: {
    color: "#003A63",
    color: "#D6C396",
    fontSize: 46,
    fontWeight: "700",
  },

  iconRow: {
    flex: 0.8,
    flexDirection: "row",
  },

  icon: {
    width: width * 0.35,
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
    marginLeft: width * 0.09,
    marginTop: height * 0.025,
  },

  dashText: {
    color: "#003a63",
    fontSize: 15,
    fontWeight: "700",
    alignSelf: "center",
    marginLeft: width * 0.01,
    marginTop: height * 0.01,
  },

  CUlogo: {
    width: 186,
    height: 54,
    opacity: 0.85,
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
    width: 263,
    height: 116,
    color: "#efefef",
    fontSize: 17,
    fontWeight: "100",
    textAlign: "center",
    marginTop: height * 0.02,
  },

  verseContainer: {
    flex: 1,
    width: 337,
    height: 230,
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

  plusSymbol: {
    color: "#003A63",
    fontSize: 46,
    fontWeight: "700",
    marginLeft: width * 0.115,
    marginTop: height * 0.045,
  },
});

export default Dashboard;
