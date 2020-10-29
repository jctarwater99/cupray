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

const RefactorRequestScreen = ({ route, navigation }) => {

    let [requests, setRequest] = useState([]);

    useEffect(() => {
      queries.getRequest(route.params.id, (results) =>
        setRequest(results)
      );
    }, []);

    let listItemView = (request) => {
        return (
          <View
            key={request.id}
            style={styles.requestContainer}
          >
            <Text style={styles.requestTitles}>{request.subject}</Text>
          </View>
        );
      };

    return (
        <SafeAreaView style={{ flex: 1 }}>
          <View style={styles.container}>
            {/* this line is returning the wrong request subject and idk why */}
            <Text style={styles.title}>
            {request.subject}
            </Text>
            <View>
              <FlatList
              // Enter Request Details here
                data={requests}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => listItemView(item)}
              />
            </View>
          </View>
        </SafeAreaView>
      );
}
    
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
    height: 540,
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

  title: {
    color: "#003A63",
    fontSize: 30,
    fontWeight: "700",
    marginBottom: height * 0.05,
    marginTop: height * 0.05,
  },

});


export default RefactorRequestScreen;