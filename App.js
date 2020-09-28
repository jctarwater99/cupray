import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Button, Text, View } from "react-native";
import { createDatabase } from "./database/create";
import { populateDB } from "./database/populate";
import * as queries from "./database/query";
import { Request, Request_Tag, Tag, Reminder } from "./database/objects";
import { disableExpoCliLogging } from "expo/build/logs/Logs";

//import { insertAndQuery, makeTable } from "./database/create";

export default function App() {
  const Stack = createStackNavigator();

  return (
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
          title="Create/Populate DB"
          onPress={() => {
            createDatabase();
            populateDB();
          }} //navigation.navigate("SecondScreen")}
        />
      </View>
      <View
        style={{
          backgroundColor: "#00f",
          flex: 1,
        }}
      >
        <Button title="Query DB" onPress={() => queries.getTags()} />
      </View>
    </View>
  );
};

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
