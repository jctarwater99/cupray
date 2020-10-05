import React from "react";
import { Image, TouchableOpacity, Dimensions, FlatList } from "react-native";
import { StyleSheet, Button, Text, View } from "react-native";
import { populateDB } from "../database/populate";
import { createDatabase } from "../database/create";
import * as queries from "../database/query";

export function Dashboard({ navigation }) {
  return (
    <View style={styles.dashboardContainer}>
      <View style={styles.verseofDay}>
        <Text style={styles.verseOf}>Verse of the Day:</Text>
        <Text style={styles.nowMay}>
          “Now may the Lord of Peace himself give you peace at all times and in
          every way. {"\n"}The Lord be with all of you.” {"\n"} (2 Thess. 3:16)
        </Text>
      </View>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.dashButton}
          onPress={() => {
            createDatabase();
            populateDB();
          }}
        >
          <Image
            style={styles.dashImage}
            source={require("../assets/journal2.png")}
          />
          <Text style={styles.dashText}>Prayer Journal</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.dashButton}
          onPress={() => queries.getTags()}
        >
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
        <TouchableOpacity style={styles.dashButton}></TouchableOpacity>
      </View>
      <Image
        style={styles.CUlogo}
        source={require("../assets/cuLogoColor.png")}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    marginTop: -150,
    marginLeft: -40,
  },

  container2: {
    flex: 1,
    flexDirection: "row",
    marginTop: 10,
    marginLeft: -40,
    alignContent: "center",
  },

  dashButton: {
    width: 135,
    height: 138,
    shadowColor: "rgba(0, 0, 0, 0.16)",
    shadowOffset: { width: 3, height: 0 },
    shadowRadius: 5,
    borderRadius: 20,
    backgroundColor: "#e8e7e4",
    marginLeft: 40,
    alignContent: "center",
  },

  dashImage: {
    width: 65,
    height: 95,
    marginLeft: 35,
    marginTop: 20,
  },

  dashText: {
    width: 108,
    height: 22,
    color: "#003a63",
    fontSize: 15,
    fontWeight: "700",
    alignSelf: "center",
    marginTop: 42,
    marginLeft: 20,
  },

  CUlogo: {
    width: 263,
    height: 76,
    opacity: 0.85,
    marginBottom: 30,
  },

  dashboardContainer: {
    flex: 1,
    backgroundColor: "#EFEFEF",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
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

  verseOf: {
    width: 169,
    height: 28,
    color: "#d6c396",
    fontSize: 20,
    fontWeight: "700",
    marginTop: 30,
    textAlign: "center",
  },

  nowMay: {
    width: 263,
    height: 116,
    color: "#efefef",
    fontSize: 17,
    fontWeight: "300",
    textAlign: "center",
  },

  pray: {
    width: 74,
    height: 103,
    marginTop: 250,
  },

  verseofDay: {
    width: 337,
    height: 230,
    alignItems: "center",
    shadowColor: "rgba(0, 0, 0, 0.16)",
    shadowOffset: { width: 3, height: 0 },
    shadowRadius: 6,
    borderRadius: 20,
    backgroundColor: "#003A63",
    marginBottom: 180,
  },
});
