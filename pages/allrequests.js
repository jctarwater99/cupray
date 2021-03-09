import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  Image,
  TouchableOpacity,
  Dimensions,
  FlatList,
  TextInput,
} from "react-native";
import { StyleSheet, Button, Text, View } from "react-native";
import { populateDB } from "../database/populate";
import { createDatabase, dropForTesting } from "../database/create";
import * as queries from "../database/query";
import * as bookKeeping from "../database/bookKeeping";
import { useFocusEffect } from "@react-navigation/native";

var { height, width } = Dimensions.get("window");

const AllReqs = ({ navigation }) => {
  let [requests, setRequests] = useState([]);
  let [searchTag, setSearchTag] = useState("");
  let [allReqs, setAllReqs] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      const unsubscribe = navigation.addListener("focus", () => {
        queries.getAllRequestsInCategory("%", (result) => {
          setRequests(removeDupes(result));
        });
        queries.getAllRequests((results) => {
          let reqs = [];
          let j = 0;
          for (var i = 0; i < results.length; i++) {
            if (results[i].id == i - j + 1) {
              reqs.push(results[i]);
            } else {
              j++;
            }
          }
          setAllReqs(reqs);
        });
        bookKeeping.checkBooks();
      });

      return () => unsubscribe;
    }, [navigation])
  );
  // useEffect(() => {
  //   queries.getAllRequestsInCategory("%", (result) => {
  //     setRequests(removeDupes(result));
  //   });
  //   queries.getAllRequests((results) => {
  //     let reqs = [];
  //     let j = 0;
  //     for (var i = 0; i < results.length; i++) {
  //       if (results[i].id == i - j + 1) {
  //         reqs.push(results[i]);
  //       } else {
  //         j++;
  //       }
  //     }
  //     setAllReqs(reqs);
  //   });
  //   bookKeeping.checkBooks();
  // }, []);

  let removeDupes = (a) => {
    var seen = {};
    return a.filter((item) => {
      return seen.hasOwnProperty(item.requestID)
        ? false
        : (seen[item.requestID] = true);
    });
  };

  let listItemView = (request) => {
    return (
      <TouchableOpacity
        key={request.id}
        style={styles.requestContainer}
        onPress={() => {
          navigation.navigate("IndividualRequest", {
            cat_name: allReqs[request.requestID - 1].name,
            req_id: request.requestID,
            isNewReq: false,
          });
        }}
        onLongPress={() => {
          //  setRequestID(request.id);
          //  toggleDeletePopupVisibility(!deletePopupVisible);
        }}
      >
        <View style={styles.circle} />
        <Text style={styles.requestTitles}>{request.subject}</Text>
        <View style={{ flex: 1 }}></View>
      </TouchableOpacity>
    );
  };

  let getRequests = () => {
    queries.getAllRequestsInCategory(searchTag + "%", setRequests);
  };

  let handleKeyDown = (e) => {
    getRequests();
  };

  return (
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={
          <View>
            <View style={{ flexDirection: "row", marginRight: width * 0.02 }}>
              <TouchableOpacity onPress={() => navigation.openDrawer()}>
                <Image
                  style={{
                    marginRight: width * 0.05,
                    marginTop: height * 0.015,
                    width: 30,
                    height: 30,
                    resizeMode: "contain",
                  }}
                  source={require("../assets/hamburger.png")}
                ></Image>
              </TouchableOpacity>
              <Text style={styles.title}>
                All Requests<Text style={styles.titleAccent}>.</Text>
              </Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                onFocus={() => setSearchTag("")} //Doesn't work for some reason
                onChangeText={(text) => setSearchTag(text)}
                onKeyPress={(e) => handleKeyDown(e)}
                status="info"
                placeholder="Search for Tag"
                clearButtonMode="always"
                style={{
                  borderRadius: 10,
                  borderColor: "#333",
                  backgroundColor: "#fff",
                  padding: 10,
                  width: "95%",
                }}
                textStyle={{ color: "#000" }}
              />
            </View>
          </View>
        }
        data={requests}
        removeClippedSubviews={false}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => listItemView(item)}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EFEFEF",
    alignItems: "center",
    marginTop: height * 0.06,
    marginLeft: width * 0.04,
  },

  requestContainer: {
    width: width * 0.85,
    height: width * 0.17,
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
    marginTop: height * 0.025,
    marginLeft: width * 0.05,
  },

  requestArrow: {
    color: "#D6C396",
    fontSize: 20,
    fontWeight: "700",
    marginTop: height * 0.02,
    marginRight: width * 0.04,
  },

  circle: {
    width: width * 0.08,
    height: width * 0.08,
    borderRadius: 100 / 2,
    borderWidth: 2,
    borderColor: "#D6C396",
    marginTop: height * 0.02,
    marginLeft: width * 0.05,
  },

  title: {
    color: "#D6C396",
    fontSize: width * 0.12,
    fontWeight: "700",
    marginBottom: height * 0.01,
  },

  titleAccent: {
    color: "#003A63",
    fontSize: width * 0.12,
    fontWeight: "700",
  },

  searchButton: {
    width: 50,
    borderRadius: 10,
    backgroundColor: "#D3D3D3",
    padding: 6,
  },

  searchButtonTxt: {
    color: "#7E8C96",
    fontSize: 19,
    fontWeight: "500",
    textAlign: "center",
  },
});

export default AllReqs;
