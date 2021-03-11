import React, { useEffect, useState } from "react";
import { Image, TouchableOpacity, Dimensions, FlatList } from "react-native";
import { StyleSheet, Button, Text, View } from "react-native";
import * as Notifications from "expo-notifications";
import * as queries from "../database/query";
import * as updates from "../database/update";
import { populateDB, populateMinimum } from "../database/populate";
import { createDatabase, dropForTesting } from "../database/create";

var { height, width } = Dimensions.get("window");

const TempDash = ({ navigation }) => {
  return (
    <View style={{ flex: 1, margin: 25, marginTop: 100 }}>
      <Text style={{ marginBottom: 35, fontSize: 20, fontWeight: "400" }}>
        Debug Menu For Testing Purposes
      </Text>
      <TouchableOpacity
        style={{
          marginLeft: 75,
          width: 150,
          backgroundColor: "#0F0F0F",
          padding: 5,
        }}
        onPress={() => {
          dropForTesting();
          createDatabase();
          populateDB();
        }}
      >
        <Text style={{ color: "#FFFFFF" }}>Populate Database</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          marginTop: 20,
          marginLeft: 75,
          width: 150,
          backgroundColor: "#0F0F0F",
          padding: 5,
        }}
        onPress={() => {
          Notifications.cancelAllScheduledNotificationsAsync();
        }}
      >
        <Text style={{ color: "#FFFFFF" }}>Clear Notifications</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          marginTop: 20,
          marginLeft: 75,
          width: 150,
          backgroundColor: "#0F0F0F",
          padding: 5,
        }}
        onPress={() => {
          Notifications.cancelAllScheduledNotificationsAsync();
          dropForTesting();
        }}
      >
        <Text style={{ color: "#FFFFFF" }}>Clear Database</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          marginTop: 20,
          marginLeft: 75,
          width: 150,
          backgroundColor: "#0F0F0F",
          padding: 5,
        }}
        onPress={() => {
          createDatabase();
          populateMinimum();
        }}
      >
        <Text style={{ color: "#FFFFFF" }}>Create Database</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          marginTop: 20,
          marginLeft: 75,
          width: 150,
          backgroundColor: "#0F0F0F",
          padding: 5,
        }}
        onPress={() => { 
            queries.getAllRequests((results)=>console.log(results));
        }}
      >
        <Text style={{ color: "#FFFFFF" }}>Get Categories</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  // Overall container for screen
});

export default TempDash;
