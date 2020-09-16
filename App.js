import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Button, Text, View } from "react-native";
import * as SQLite from "expo-sqlite";

export default function App() {
  const Stack = createStackNavigator();

  return (
    //<View style={styles.container}>
    //  <Text>Open up App.js to start working on your app?</Text>
    //  <StatusBar style="auto" />
    //</View>
    //  <View style={{ backgroundColor: "#0f0", flex: 1 }}></View>
    //  <View style={{ backgroundColor: "#f00", flex: 1 }}></View>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={testOne} />
        <Stack.Screen name="SecondScreen" component={testTwo} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const testOne = ({ navigation }) => {
  return (
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
      >
        <Button
          title="Press Me"
          onPress={() => makeDatabase()} //navigation.navigate("SecondScreen")}
        />
      </View>
      <View
        style={{
          backgroundColor: "#00f",
          flex: 1,
        }}
      />
    </View>
  );
};

function makeDatabase() {
  const db = SQLite.openDatabase("db.cupray");
  db.transaction((tx) => {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS reqests (id INTEGER PRIMARY KEY AUTOINCREMENT, description TEXT)"
    );
    tx.executeSql("INSERT INTO requests (description) values (?)", [
      "gibberish",
    ]);
    tx.executeSql("SELECT * FROM requests", null, (tx, results) => {
      let dataLen = results.rows.length;
      alert(dataLen);
    });
  });
}

const testTwo = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#000",
      }}
    ></View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
