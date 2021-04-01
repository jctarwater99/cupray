import React, { useEffect, useState } from "react";
import {
  Image,
  TouchableOpacity,
  Dimensions,
  FlatList,
  Alert,
  SafeAreaView,
} from "react-native";
import { StyleSheet, Text, View } from "react-native";
import * as queries from "../database/query";
import * as updates from "../database/update";
import Modal from "react-native-modal";
import { checkBooks } from "../database/bookKeeping";
import * as scheduler from "../schedule/scheduler";
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

  let listItemView = (request) => {
    return (
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
          onPress={() => {
            navigation.navigate("IndividualRequest", {
              cat_name: route.params.cat_name,
              req_id: request.id,
              isNewReq: false,
            });
          }}
          onLongPress={() => {
            setRequestID(request.id);
            toggleArchivePopupVisibility(!archivePopupVisible);
          }}
        >
          <View style={{ flexDirection: "column" }}>
            <Text style={styles.requestTitles}>{request.subject}</Text>
            <Text
              numberOfLines={1}
              style={[styles.requestSubTitles, { maxWidth: width * 0.6 }]}
            >
              {request.description}
            </Text>
          </View>
          <View style={{ flex: 1 }}></View>
        </TouchableOpacity>
      </View>
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
                    Requests
                    <Text style={styles.titleAccent}>.</Text>
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignSelf: "stretch",
                    justifyContent: "center",
                  }}
                >
                  <Dropdown
                    defaultValue={category}
                    style={{
                      width: 120,
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
                </View>
              </View>
            }
            data={requests}
            showsVerticalScrollIndicator={false}
            removeClippedSubviews={false}
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
    marginTop: height * 0.06,
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

    borderRadius: 10,
    overflow: "hidden",
  },

  requestTitles: {
    color: "#7E8C96",
    fontSize: 15,
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
    color: "#003A63",
    fontSize: width * 0.12,
    fontWeight: "700",
    marginRight: width * 0.15,
  },

  titleAccent: {
    color: "#D6C396",
    fontSize: width * 0.12,
    fontWeight: "700",
  },

  addReq: {
    alignItems: "center",
    margin: 20,
    flex: 12,
  },

  createReqButton: {
    width: 37,
    height: 36,
    borderRadius: 6,
    backgroundColor: "#D3D3D3",
    padding: 6,
  },

  plusSign: {
    color: "#7E8C96",
    fontSize: 15,
    fontWeight: "700",
    textAlign: "center",
  },

  modalContent: {
    justifyContent: "center",
    alignItems: "center",
    margin: 0,
  },

  popUpContainer: {
    width: width * 0.85,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    padding: height * 0.02,
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
    borderRadius: 20,
    backgroundColor: "#D6C396",
    alignItems: "center",
  },

  popUpHeader: {
    flex: 0,
    fontSize: 16,
    color: "#fff",
    fontWeight: "700",
    padding: height * 0.01,
  },
});

export default RequestsScreen;
