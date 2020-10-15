import React, { useState } from "react";
import { Image, TouchableOpacity, Dimensions, FlatList } from "react-native";
import { StyleSheet, Button, Text, View } from "react-native";
import { populateDB } from "../database/populate";
import { createDatabase } from "../database/create";
import * as queries from "../database/query";
import { Category } from "../database/objects";

var { height, width } = Dimensions.get("window");

const CategoryScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.folderContainer}>
        <Text style={styles.folderTitles}>Scripture Prayers</Text>
        <View style={styles.lineStyle} />
        <Text style={styles.folderTitles}>Family</Text>
        <View style={styles.lineStyle} />
        <Text style={styles.folderTitles}>Intimacy With God</Text>
        <View style={styles.lineStyle} />
        <Text style={styles.folderTitles}>Missions</Text>
        <View style={styles.lineStyle} />
        <Text style={styles.folderTitles}></Text>
        <Text style={styles.folderTitles}></Text>
      </View>
      <View style={styles.addCat}>
        <TouchableOpacity style={styles.createCategoryButton}>
          <Text style={styles.plusSign}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  // Overall container for screen
  container: {
    flex: 1,
    backgroundColor: "#EFEFEF",
    alignItems: "center",
    marginTop: height * 0.06,
  },

  folderContainer: {
    width: 337,
    height: "auto",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
    borderRadius: 20,
    backgroundColor: "#E8E7E4",
  },

  folderTitles: {
    color: "#003a63",
    fontSize: 15,
    fontWeight: "700",
    flexDirection: "column",
    marginTop: height * 0.04,
    marginBottom: height * -0.02,
    marginLeft: width * 0.1,
  },

  lineStyle: {
    borderWidth: 1,
    borderColor: "#D3D3D3",
    margin: 40,
    marginBottom: height * -0.02,
    marginTop: height * 0.04,
  },

  addCat: {
    flex: 2,
    flexDirection: "column",
    justifyContent: "flex-end",
    margin: 60,
  },

  createCategoryButton: {
    width: 37,
    height: 36,
    borderRadius: 6,
    backgroundColor: "#D3D3D3",
    padding: 10,
  },

  plusSign: {
    color: "#003a63",
    fontSize: 15,
    fontWeight: "700",
    marginTop: height * -0.003,
    textAlign: "center",
  },
});

export default CategoryScreen;
