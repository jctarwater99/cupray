import React, { useEffect, useState } from "react";
import { Image, TouchableOpacity, Dimensions, FlatList } from "react-native";
import { StyleSheet, Button, Text, View } from "react-native";
import * as queries from "../database/query";
import * as updates from "../database/update";

var { height, width } = Dimensions.get("window");

const TempDash = ({ navigation }) => {
  let [isPressed, setIsPressed] = useState(false);

  return (
    <View style={{ flex: 1 }}>
      {/*Home */}
      <View style={{ flex: 10, backgroundColor: "#000000" }} />

      {/*Verse*/}
      <View style={{ flex: 20, backgroundColor: "#00FF00" }} />

      {/*Buttons 1 */}
      <View
        style={{ flex: 15, flexDirection: "row", backgroundColor: "#0000FF" }}
      >
        <View style={{ flex: 2, backgroundColor: "#FFFF00" }}>
          <Button title="Button3"></Button>
        </View>
        <View style={{ flex: 2, backgroundColor: "#00FFFF" }}>
          <TouchableOpacity
            style={isPressed ? styles.pressed : styles.unpressed}
            onPress={() => {
              setIsPressed(!isPressed);
            }}
          >
            <Text>Button 4</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/*Buttons 2 */}
      <View
        style={{ flex: 15, flexDirection: "row", backgroundColor: "#FF0000" }}
      >
        <View style={{ flex: 2, backgroundColor: "#00FFFF" }}>
          <Button
            title="Button1"
            onPress={() => {
              queries.testQuery();
            }}
          ></Button>
        </View>
        <View style={{ flex: 2, backgroundColor: "#FFFF00" }}>
          <Button
            title="Button2"
            onPress={() => {
              updates.rollbackNotificationWeight();
            }}
          ></Button>
        </View>
      </View>

      {/*CU logo */}
      <View style={{ flex: 5, backgroundColor: "#000000" }} />
    </View>
  );
};

const styles = StyleSheet.create({
  // Overall container for screen
  pressed: {
    backgroundColor: "#000000",
    height: 45,
  },
  unpressed: {
    backgroundColor: "#FFFFFF",
    height: 45,
  },
});

export default TempDash;
