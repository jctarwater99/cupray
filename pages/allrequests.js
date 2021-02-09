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

var { height, width } = Dimensions.get("window");

const AllReqs = ({ navigation }) => {
  let [requests, setRequests] = useState([]);
  let [searchTag, setSearchTag] = useState("");

  useEffect(() => {
    queries.getAllRequestsInCategory("%", (result) => {
      setRequests(removeDupes(result));
    });
    bookKeeping.checkBooks();
  }, []);

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
            //cat_id: route.params.cat_id,
            cat_name: request.name,
            req_id: request.requestID,
            isNewReq: false,
          });
        }}
        onLongPress={() => {
          //  setRequestID(request.id);
          //  toggleDeletePopupVisibility(!deletePopupVisible);
          console.log(request);
        }}
      >
        <View style={styles.circle} />
        <Text style={styles.requestTitles}>{request.subject}</Text>
        <View style={{ flex: 1 }}></View>
        <View>
          <Text style={styles.requestArrow}>{"➤"}</Text>
        </View>
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
                  width: "80%",
                }}
                textStyle={{ color: "#000" }}
              />
              <View style={{ width: "3%" }} />
              <TouchableOpacity
                onPress={() => getRequests()}
                style={styles.searchButton}
              >
                <Text style={styles.searchButtonTxt}>Go</Text>
              </TouchableOpacity>
            </View>
          </View>
        }
        data={requests}
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
    width: 26,
    height: 26,
    borderRadius: 100 / 2,
    borderWidth: 2,
    borderColor: "#D6C396",
    marginTop: height * 0.019,
    marginLeft: width * 0.05,
  },

  title: {
    color: "#D6C396",
    fontSize: 46,
    fontWeight: "700",
    marginBottom: height * 0.01,
  },

  titleAccent: {
    color: "#003A63",
    fontSize: 46,
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
