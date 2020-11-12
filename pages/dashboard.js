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
      <View style={styles.verseofDay}>
        <Text style={styles.verseOf}>Verse of the Day:</Text>
        <View style={styles.lineStyle} />
        <Text style={styles.nowMay}>
          “Now may the Lord of Peace himself give you peace at all times and in
          every way. {"\n"}The Lord be with all of you.” {"\n"} (2 Thess. 3:16)
        </Text>
      </View>

      <View style={styles.container}>
        <TouchableOpacity
          style={styles.dashButton}
          onPress={() => navigation.navigate("Cat")}
        >
          <Image
            style={styles.dashImage}
            source={require("../assets/journal2.png")}
          />
          <Text style={styles.dashText}>Prayer Journal</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.dashButton} onPress={() => void 0}>
          <Image
            style={styles.dashImage}
            source={require("../assets/pray.png")}
          />
          <Text style={styles.dashText}>Prayer Time</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.container2}>
        <TouchableOpacity style={styles.dashButton}>
          <Image
            style={styles.dashImage}
            source={require("../assets/journal1.png")}
          />
          <Text style={styles.dashText}>Scripture</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.dashButton}
          onPress={() => {
            navigation.navigate("ThisRequest", {
              cat_id: 1,
              cat_name: "Select Category",
              req_id: 1,
              isNewReq: true,
            });
          }}
        >
          <Text style={styles.plusSymbol}> + </Text>
          <Text style={[styles.dashText, {marginTop: height * 0.07}]}>New Request</Text>
        </TouchableOpacity>
      </View>
      <View>
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

  container: {
    flex: 2,
    flexDirection: "row",
    marginTop: height * -0.2,
    marginLeft: width * -0.1,
  },

  container2: {
    flex: 3,
    flexDirection: "row",
    marginTop: height * 0.1,
    marginLeft: -40,
    alignContent: "center",
  },

  title: {
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

  dashButton: {
    width: 135,
    height: 138,
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
    marginLeft: width * 0.1,
    alignContent: "center",
  },

  dashImage: {
    width: 65,
    height: 95,
    marginLeft: width * 0.09,
    marginTop: height * 0.025,
  },

  dashText: {
    color: "#003a63",
    fontSize: 15,
    fontWeight: "700",
    alignSelf: "center",
    marginTop: height * 0.035,
    marginLeft: width * -0.01,
  },

  CUlogo: {
    width: 186,
    height: 54,
    opacity: 0.85,
    marginBottom: height * 0.04,
    marginTop: height * 0.04,
  },

  verseOf: {
    width: 169,
    height: 28,
    color: "#d6c396",
    fontSize: 20,
    fontWeight: "700",
    marginTop: height * 0.05,
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

  verseofDay: {
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
    marginBottom: 180,
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
