import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function App() {
  return (
    //<View style={styles.container}>
    //  <Text>Open up App.js to start working on your app?</Text>
    //  <StatusBar style="auto" />
    //</View>
    //  <View style={{ backgroundColor: "#0f0", flex: 1 }}></View>
    //  <View style={{ backgroundColor: "#f00", flex: 1 }}></View>
    <View
      style={{
        flex: 1,
        backgroundColor: "#000",
      }}
    >
      <View
        style={{
          backgroundColor: "#f00",
          flex: 1,
        }}
      />
      <View
        style={{
          backgroundColor: "#0f0",
          flex: 1,
        }}
      />
      <View
        style={{
          backgroundColor: "#00f",
          flex: 1,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
