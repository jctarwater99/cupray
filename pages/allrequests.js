import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Image, TouchableOpacity, Dimensions, FlatList } from "react-native";
import { StyleSheet, Button, Text, View } from "react-native";
import { populateDB } from "../database/populate";
import { createDatabase, dropForTesting } from "../database/create";
import * as queries from "../database/query";

var { height, width } = Dimensions.get("window");


const AllReqs = ({ navigation }) => {
    return ( 
        <View style={styles.container}>
            <View style={{ flexDirection: "row", marginRight: width * 0.02}}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Image
            style={{
              marginRight: width * 0.05,
              marginTop: height * 0.015,
              width: 30,
              height: 30,
              resizeMode: 'contain'
            }}
            source={require("../assets/hamburger.png")}
          ></Image>
        </TouchableOpacity>
        <Text style={styles.title}>
          All Requests<Text style={styles.titleAccent}>.</Text>
        </Text>
      </View>
        </View>
    ) };


    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: "#EFEFEF",
            alignItems: "center",
            marginTop: height * 0.06,
          },

          title: {
            color: "#D6C396",
            fontSize: 46,
            fontWeight: "700",
            marginBottom: height * 0.01,
          },
        
          titleAccent: {
            color: "#003A63",
            fontSize: 46,
            fontWeight: "700",
          },

    });


    export default AllReqs;