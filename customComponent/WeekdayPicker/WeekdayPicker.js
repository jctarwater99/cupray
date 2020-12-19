import React, { useState } from "react";
import {
  View,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

let { height, width } = Dimensions.get("window");

export default function WeekdayPicker(props) {
  let { onChange, days } = props;

  // Populate days of the week
  let daysContainer = [];
  Object.keys(days).forEach((day, i) => {
    let daysMapping = ["S", "M", "T", "W", "T", "F", "S"];
    daysContainer.push(
      <TouchableOpacity
        key={i}
        style={[styles.default, days[i] ? styles.active : styles.inactive]}
        onPress={() => {
          days[day] = !days[day];
          // Call the parent function to set the new reminder in the state
          onChange(days);
        }}
      >
        <Text style={days[i] ? styles.activeText : styles.inactiveText}>
          {daysMapping[day]}
        </Text>
      </TouchableOpacity>
    );
  });
  return <View style={[styles.container]}>{daysContainer}</View>;
}

const styles = StyleSheet.create({
  weekContainer: {
    flexDirection: "row",
    justifyContent: "center",
    display: "flex",
    height: 50,
    alignItems: "center",
  },

  dayOfTheWeek: {
    margin: 3,
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
