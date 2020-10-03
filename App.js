import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Image, TouchableOpacity, Dimensions, FlatList } from "react-native";
import { StyleSheet, Button, Text, View } from "react-native";
import { createDatabase } from "./database/create";
import { populateDB } from "./database/populate";
import * as queries from "./database/query";
import "react-native-gesture-handler";
import { Request, Request_Tag, Tag, Reminder } from "./database/objects";
import { disableExpoCliLogging } from "expo/build/logs/Logs";

//import { insertAndQuery, makeTable } from "./database/create";

export default function App() {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        {<Stack.Screen name="Welcome" component={WelcomeScreen} />}
        {<Stack.Screen name="Dash" component={Dashboard} />}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.welcomeContainer}>
      <Image style={styles.pray} source={require("./assets/pray.png")} />

      <Text style={styles.cu}>
        CU<Text style={styles.cupray}>Pray.</Text>
      </Text>
      <Text style={styles.thePrayer}>
        the prayer journal app for your 1000 days
      </Text>
      <View style={{ flex: 1, justifyContent: "flex-end" }}>
        <TouchableOpacity
          style={styles.bbutton}
          onPress={() => navigation.navigate("Dash")}
        >
          <Text style={styles.prayButton}>let's start praying</Text>
        </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

function Dashboard({ navigation }) {
  return (
    <View style={styles.dashboardContainer}>
      <View style={styles.verseofDay}>
        <Text style={styles.verseOf}>Verse of the Day:</Text>
        <Text style={styles.nowMay}>
          “Now may the Lord of Peace himself give you peace at all times and in
          every way. {"\n"}The Lord be with all of you.” {"\n"} (2 Thess. 3:16)
        </Text>
      </View>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.dashButton}
          onPress={() => {
            createDatabase();
            populateDB();
          }}
        >
          <Image
            style={styles.dashImage}
            source={require("./assets/journal2.png")}
          />
          <Text style={styles.dashText}>Prayer Journal</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.dashButton}
          onPress={() => queries.getTags()}
        >
          <Image
            style={styles.dashImage}
            source={require("./assets/pray.png")}
          />
          <Text style={styles.dashText}>Prayer Time</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.container2}>
        <TouchableOpacity style={styles.dashButton}>
          <Image
            style={styles.dashImage}
            source={require("./assets/journal1.png")}
          />
          <Text style={styles.dashText}>Scripture</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.dashButton}></TouchableOpacity>
      </View>
      <Image
        style={styles.CUlogo}
        source={require("./assets/cuLogoColor.png")}
      />
    </View>
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
    flexDirection: "row",
    marginTop: -150,
    marginLeft: -40,
  },

  container2: {
    flex: 1,
    flexDirection: "row",
    marginTop: 10,
    marginLeft: -40,
    alignContent: "center",
  },

  dashButton: {
    width: 135,
    height: 138,
    shadowColor: "rgba(0, 0, 0, 0.16)",
    shadowOffset: { width: 3, height: 0 },
    shadowRadius: 5,
    borderRadius: 20,
    backgroundColor: "#e8e7e4",
    marginLeft: 40,
    alignContent: "center",
  },

  dashImage: {
    width: 65,
    height: 95,
    marginLeft: 35,
    marginTop: 20,
  },

  dashText: {
    width: 108,
    height: 22,
    color: "#003a63",
    fontSize: 15,
    fontWeight: "700",
    alignSelf: "center",
    marginTop: 42,
    marginLeft: 20,
  },

  CUlogo: {
    width: 263,
    height: 76,
    opacity: 0.85,
    marginBottom: 30,
  },

  welcomeContainer: {
    flex: 1,
    backgroundColor: "#003a63",
    alignItems: "center",
    justifyContent: "center",
  },

  box: {
    backgroundColor: "#003a63",
  },

  dashboardContainer: {
    flex: 1,
    backgroundColor: "#EFEFEF",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },

  cupray: {
    width: 233,
    height: 82,
    color: "#d6c396",
    fontSize: 59,
    fontWeight: "700",
    textAlign: "center",
  },
  cu: {
    color: "#efefef",
    width: 233,
    height: 82,
    fontSize: 59,
    fontWeight: "700",
    textAlign: "center",
  },

  thePrayer: {
    width: 219,
    height: 53,
    color: "#d6c396",
    fontSize: 19,
    fontWeight: "700",
    textAlign: "center",
    marginTop: -10,
  },

  verseOf: {
    width: 169,
    height: 28,
    color: "#d6c396",
    fontSize: 20,
    fontWeight: "700",
    marginTop: 30,
    textAlign: "center",
  },

  nowMay: {
    width: 263,
    height: 116,
    color: "#efefef",
    fontSize: 17,
    fontWeight: "300",
    textAlign: "center",
  },

  pray: {
    width: 74,
    height: 103,
    marginTop: 250,
  },

  bbutton: {
    width: 244,
    height: 61,
    alignItems: "center",
    shadowColor: "rgba(0, 0, 0, 0.16)",
    shadowOffset: { width: 3, height: 0 },
    shadowRadius: 6,
    borderRadius: 20,
    backgroundColor: "#e8e7e4",
    marginBottom: 100,
  },

  prayButton: {
    color: "#003a63",
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
    marginTop: 18,
  },

  gridView: {
    marginTop: 10,
    flex: 1,
  },
  itemContainer: {
    justifyContent: "flex-end",
    borderRadius: 5,
    padding: 10,
    height: 150,
  },
  itemName: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "600",
  },
  itemCode: {
    fontWeight: "600",
    fontSize: 12,
    color: "#fff",
  },

  verseofDay: {
    width: 337,
    height: 230,
    alignItems: "center",
    shadowColor: "rgba(0, 0, 0, 0.16)",
    shadowOffset: { width: 3, height: 0 },
    shadowRadius: 6,
    borderRadius: 20,
    backgroundColor: "#003A63",
    marginBottom: 180,
  },

  separator: {
    marginVertical: 8,
    borderBottomColor: "#EFEFEF",
    borderBottomWidth: 6,
  },
});
