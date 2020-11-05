import React, { useEffect, useState } from "react";
import {
  Image,
  TouchableOpacity,
  Dimensions,
  FlatList,
  SafeAreaView,
} from "react-native";
import { StyleSheet, Button, Text, View } from "react-native";
import { populateDB } from "../database/populate";
import { createDatabase } from "../database/create";
import * as queries from "../database/query";
import { Category } from "../database/objects";

var { height, width } = Dimensions.get("window");

const RequestsScreen = ({ route, navigation }) => {
  let [requests, setRequests] = useState([]);

  useEffect(() => {
    queries.getRequestsInCategory(route.params.cat_id, (results) =>
      setRequests(results)
    );
  }, []);

  let listItemView = (request) => {
    return (
      <TouchableOpacity
        key={request.id}
        style={styles.requestContainer}
        // Navigate @ Request, need isNew??
        onPress={() => {
          navigation.navigate("RefactorRequest", {
            cat_id: route.params.cat_id,
            cat_name: route.params.cat_name,
            req_id: request.id,
            isNew: false,
          });
        }}
      >
        <View style={styles.circle} />
        <Text style={styles.requestTitles}>{request.subject}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.title}>
          Requests<Text style={styles.titleAccent}>.</Text>
        </Text>

        <View>
          <FlatList
            data={requests}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => listItemView(item)}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  // Overall container for screen
  container: {
    flex: 1,
    backgroundColor: "#EFEFEF",
    alignItems: "center",
    marginTop: height * 0.02,
  },

  requestContainer: {
    width: 327,
    height: 64,
    flexDirection: "row",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.27,
    shadowRadius: 3.65,

    elevation: 6,
    borderRadius: 10,
    backgroundColor: "#E8E7E4",
    margin: height * 0.01,
  },

  requestTitles: {
    color: "#7E8C96",
    fontSize: 15,
    fontWeight: "700",
    marginTop: height * 0.02,
    marginLeft: width * 0.05,
  },

  circle: {
    width: 26,
    height: 26,
    borderRadius: 100 / 2,
    borderWidth: 2,
    borderColor: "#D6C396",
    marginTop: height * 0.019,
    marginLeft: width * 0.09,
  },

  title: {
    color: "#003A63",
    fontSize: 46,
    fontWeight: "700",
    marginBottom: height * 0.02,
    marginLeft: width * -0.3,
  },

  titleAccent: {
    color: "#D6C396",
    fontSize: 46,
    fontWeight: "700",
  },
});

export default RequestsScreen;
