import React, { useEffect, useState } from "react";
import { Image, TouchableOpacity, Dimensions, FlatList } from "react-native";
import { StyleSheet, Button, Text, View } from "react-native";
import * as queries from "../database/query";
import * as updates from "../database/update";

var { height, width } = Dimensions.get("window");

const TempDash = ({ navigation }) => {
  let [isPressed, setIsPressed] = useState(false);
  let [test, setTest] = useState([0, 1, 0]);

  return (
    <View style={{ flex: 1 }}>
      {/*Home */}
      <View style={{ flex: 10, backgroundColor: "#000000" }} />

      {/*Verse*/}
      <View style={{ flex: 20, backgroundColor: "#00FF00" }}>
        <TouchableOpacity
          style={(styles.default, test[0] ? styles.pressed : styles.unpressed)}
          onPress={() => {
            setTest([!test[0], test[1], test[2]]);
            console.log(test);
          }}
        >
          <Text>M</Text>
        </TouchableOpacity>
      </View>

      {/*Buttons 1 */}
      <View
        style={{ flex: 15, flexDirection: "row", backgroundColor: "#0000FF" }}
      >
        <View style={{ flex: 2, backgroundColor: "#FFFF00" }}>
          <Button
            title="Button3"
            onPress={() => {
              queries.getCategories((categories) => {
                categories.forEach((cat) => {
                  if (cat.name == "Missions") {
                    queries.getRequestsInCategory(cat.tagID, (reqs) => {
                      reqs.forEach((req) => {
                        console.log(req.subject);
                      });
                    });
                  }
                });
              });
            }}
          ></Button>
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
  default: {
    height: 35,
    width: 35,
    borderRadius: 35,
    alignItems: "center",
    justifyContent: "center",
  },
  active: {
    backgroundColor: "#D6C396",
  },
  inactive: {
    backgroundColor: "#D3D3D3",
  },
  activeText: {
    color: "#fff",
  },
  inactiveText: {
    color: "#003A63",
  },
});

export default TempDash;
