import React, { useEffect, useState } from "react";
import {
  Image,
  TouchableOpacity,
  Dimensions,
  FlatList,
  Alert,
  SafeAreaView,
} from "react-native";
import { StyleSheet, Text, View, TextInput } from "react-native";
import * as queries from "../database/query";
import * as inserts from "../database/insert";
import { Request } from "../database/objects";
import { checkBooks } from "../database/bookKeeping";
import { Dropdown } from "react-native-material-dropdown-v2";

var { height, width } = Dimensions.get("window");

const RequestsScreen = ({ route, navigation }) => {
  let [requests, setRequests] = useState([]);
  let [categories, setCategories] = useState([]);
  let [category, setCategory] = useState("Select");

  useEffect(() => {
    setRequests(JSON.parse(route.params.reqs).multi);

    queries.getCategories((results) => {
      let dropDownData = [];
      results.forEach((element) => {
        dropDownData.push({ value: element.name, id: element.tagID });
      });
      setCategories(dropDownData);
    });
    checkBooks();
  }, []);

  let saveReqs = () => {
    // Do stuff
    if (category == "Select") {
      Alert.alert("Notification", "Please select a category", [
        {
          text: "Ok",
        },
      ]);
      return;
    }

    let catId = 0;
    for (var i = 0; i < categories.length; i++) {
      if (category == categories[i].value) {
        catId = categories[i].id;
        break;
      }
    }

    function createRequestTag(reqId) {
      inserts.insertRequestTag({
        requestID: reqId,
        tagID: catId,
      });
      console.log("Reached at least once");
    }

    requests.forEach((request) => {
      let req = new Request();
      req.description = request.description;
      req.subject = request.subject;
      req.expire_time = new Date(new Date().getTime() + 2592000000);
      req.priority = 2;
      inserts.insertNewRequest(req, createRequestTag);
    });
  };

  let listItemView = (request, index) => {
    return (
      <SafeAreaView style={styles.container}>
        <View style={{ alignItems: "center" }}>
          <View
            style={[
              styles.requestContainer,
              {
                overflow: "visible",
                backgroundColor: "#E8E7E4",
                margin: height * 0.01,
                padding: 3,
              },
            ]}
          >
            <TouchableOpacity
              key={request.id}
              style={[{ flexDirection: "row" }]}
            >
              <View style={{ flexDirection: "column" }}>
                <TextInput
                  style={[
                    styles.requestTitles,
                    {
                      backgroundColor: "white",
                      maxWidth: width * 0.4,
                      padding: 3,
                      paddingLeft: 7,
                      borderRadius: 5,
                      width: "50%",
                    },
                  ]}
                  onChangeText={(text) => {
                    let temp = requests;
                    temp[index].subject = text;
                    setRequests(temp);
                  }}
                >
                  {request.subject}
                </TextInput>
                <TextInput
                  numberOfLines={4}
                  multiline={true}
                  style={[
                    styles.requestSubTitles,
                    {
                      marginTop: height * 0.01,
                      maxWidth: width * 0.7,
                      minWidth: width * 0.7,
                      maxHeight: height * 0.1,
                      minHeight: height * 0.1,
                      backgroundColor: "white",
                      padding: 9,
                      borderRadius: 5,
                    },
                  ]}
                  onChangeText={(text) => {
                    let temp = requests;
                    temp[index].description = text;
                    setRequests(temp);
                  }}
                >
                  {request.description}
                </TextInput>
              </View>
              <View style={{ flex: 1 }}></View>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View>
          <FlatList
            ListHeaderComponent={
              <View>
                <View style={{ flexDirection: "row" }}>
                  <TouchableOpacity onPress={() => navigation.navigate("Dash")}>
                    <Image
                      style={{
                        marginRight: width * 0.03,
                        marginTop: height * 0.015,
                        width: 30,
                        height: 30,
                        resizeMode: "contain",
                      }}
                      source={require("../assets/Home_Yellow.png")}
                    ></Image>
                  </TouchableOpacity>
                  <Text style={styles.title}>
                    Requests Found
                    <Text style={styles.titleAccent}>.</Text>
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignSelf: "stretch",
                    justifyContent: "center",
                    marginBottom: height * 0.01,
                  }}
                >
                  <Dropdown
                    defaultValue={category}
                    style={{
                      width: 100,
                      height: 40,
                      fontWeight: "600",
                    }}
                    itemTextStyle={{
                      fontWeight: "600",
                    }}
                    itemCount={6}
                    dropdownPosition={0}
                    textColor="#7E8C96"
                    data={categories}
                    onChangeText={(text) => {
                      setCategory(text);
                      route.params.cat_name = text;
                    }}
                  />
                  <TouchableOpacity
                    onPress={() => {
                      saveReqs();
                      navigation.navigate("Dash");
                    }}
                    style={styles.editButton}
                  >
                    <Text style={styles.editButtonText}>SAVE</Text>
                  </TouchableOpacity>
                </View>
              </View>
            }
            data={requests}
            showsVerticalScrollIndicator={false}
            removeClippedSubviews={false}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => listItemView(item, index)}
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
  },

  requestContainer: {
    width: width * 0.85,
    height: width * 0.4,
    flexDirection: "row",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.27,
    shadowRadius: 3.65,

    borderRadius: 10,
    overflow: "hidden",
  },

  requestTitles: {
    color: "#7E8C96",
    fontSize: 20,
    fontWeight: "700",
    marginTop: height * 0.015,
    marginLeft: width * 0.05,
  },

  requestSubTitles: {
    color: "#7E8C96",
    fontSize: 15,
    fontWeight: "400",
    marginTop: height * 0.0,
    marginLeft: width * 0.05,
    overflow: "hidden",
  },

  requestArrow: {
    color: "#D6C396",
    fontSize: 20,
    fontWeight: "700",
    marginTop: height * 0.02,
    marginRight: width * 0.04,
  },

  title: {
    color: "#003A63",
    fontSize: width * 0.1,
    fontWeight: "700",
    marginBottom: height * 0.01,
    marginTop: height * 0.005,
  },

  titleAccent: {
    color: "#D6C396",
    fontSize: width * 0.1,
    fontWeight: "700",
  },

  editButton: {
    width: 100,
    height: 35,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.27,
    shadowRadius: 2.65,

    borderRadius: 10,
    backgroundColor: "#D6C396",
    marginLeft: width * 0.3,
  },

  editButtonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
    marginTop: height * 0.009,
  },
});

export default RequestsScreen;
