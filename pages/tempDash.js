import React, { useEffect, useState } from "react";
import { Image, TouchableOpacity, Dimensions, FlatList } from "react-native";
import { StyleSheet, Button, Text, View } from "react-native";
import * as queries from "../database/query";
import * as updates from "../database/update";

var { height, width } = Dimensions.get("window");

const TempDash = ({ navigation }) => {
  let [isPressed, setIsPressed] = useState([0, 1, 0]);
  let [test, setTest] = useState([]);

  useEffect(() => {setTest([0,1,0])}, [])

  let handlePress = (number) => {
    let newDays = [...test]; // can't change days manually, must create deep copy
    newDays[number] = !newDays[number];
    setTest(newDays);
  };

  let createButton = (text, index) =>{
    return (
      <TouchableOpacity
        key={index} 
        style={[
          styles.dayOfTheWeek,
          test[index] ? styles.active : styles.inactive,
        ]}
        onPress={() => {
          handlePress(index);
        }}
      >
        <Text style={test[index] ? styles.activeText : styles.inactiveText}>
          {text}
        </Text>
      </TouchableOpacity>
    )
  }

  let makeNewItem = () =>{
    let text = ["test1", "test2", "test3"]
    let i = 0;
    let buttonList = [];
    for(const txt of text){
      buttonList.push(createButton(txt, i));
      i++;
    }
    return buttonList;
    
  }

  return (
    <View style={{ flex: 1 }}>
      <View style = {{flex: 1}} />
      <View style = {{flex: 1}} >
      {makeNewItem()}
      </View>
      <View style = {{flex: 1}} />
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
