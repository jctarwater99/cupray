import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  Image,
  TouchableOpacity,
  Dimensions,
  FlatList,
  TextInput,
  Alert,
} from "react-native";
import { StyleSheet, Button, Text, View } from "react-native";
import { populateDB } from "../database/populate";
import { createDatabase, dropForTesting } from "../database/create";
import * as queries from "../database/query";
import * as updates from "../database/update";
import * as bookKeeping from "../database/bookKeeping";
import { useFocusEffect } from "@react-navigation/native";
import Modal from "react-native-modal";
import { CheckBox } from "react-native";

var { height, width } = Dimensions.get("window");

const AllReqs = ({ navigation }) => {
  let [requests, setRequests] = useState([]);
  let [searchTag, setSearchTag] = useState("");
  let [allReqs, setAllReqs] = useState([]);
  let [checked, setCheckBox] = useState(false);
  let [requestID, setRequestID] = useState(-1);
  let [deletePopupVisible, toggleDeletePopupVisibility] = useState(false);

  const shouldSetResponse = () => true;
  const onRelease = () => Keyboard.dismiss();

  useFocusEffect(
    React.useCallback(() => {
      const unsubscribe = navigation.addListener("focus", () => {
        getRequests();
        queries.getAllRequests((results) => {
          let reqs = new Map();
          for (let i = 0; i < results.length; i++) {
            if (reqs[results[i].id] == undefined) {
              reqs[results[i].id] = results[i];
            }
          }

          setAllReqs(reqs);
        });
        bookKeeping.checkBooks();
      });

      return () => unsubscribe;
    }, [navigation])
  );

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
      <View
      style={[styles.requestContainer, {overflow: 'visible',  backgroundColor: "#E8E7E4",
      margin: height * 0.01}]} >
      <TouchableOpacity
      key={request.id}
      style={[{flexDirection: "row"}]}
        onPress={() => {
          navigation.navigate("IndividualRequest", {
            cat_name: allReqs[request.requestID].name,
            req_id: request.requestID,
            isNewReq: false,
          });
        }}
        onLongPress={() => {
          setRequestID(request.requestID);
          toggleDeletePopupVisibility(!deletePopupVisible);
        }}
      >
        <View style={styles.circle} />
        <View style={{ flexDirection: "column" }}>
          <Text style={styles.requestTitles}>{request.subject}</Text>
          <Text numberOfLines={1} style={[styles.requestSubTitles, {maxWidth: width * 0.6}]}>
            {request.description}
          </Text>
        </View>
        <View style={{ flex: 1 }}></View>
      </TouchableOpacity>
      </View>
    );
  };

  let getRequests = () => {
    if (checked) {
      queries.getAllRequestsInCategory(searchTag + "%", (result) => {
        setRequests(removeDupes(result));
      });
    } else {
      queries.getAllActiveRequestsInCategory(searchTag + "%", (result) => {
        setRequests(removeDupes(result));
      });
    }
  };

  let makeCheckBox = () => {
    return (
      <TouchableOpacity
        id={14432}
        style={[
          styles.checkBox,
          checked ? styles.active : styles.inactiveCheckBox,
        ]}
        onPress={() => {
          if (!checked) {
            queries.getAllRequestsInCategory(searchTag + "%", (result) => {
              setRequests(removeDupes(result));
            });
          } else {
            queries.getAllActiveRequestsInCategory(
              searchTag + "%",
              (result) => {
                setRequests(removeDupes(result));
              }
            );
          }
          setCheckBox(!checked);
        }}
      ></TouchableOpacity>
    );
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
                onKeyPress={(e) => getRequests()}
                status="info"
                placeholder="Search for Tag"
                clearButtonMode="always"
                style={{
                  borderRadius: 10,
                  borderColor: "#333",
                  backgroundColor: "#fff",
                  padding: 10,
                  width: "95%",
                  marginBottom: height * 0.005,
                }}
                textStyle={{ color: "#000" }}
              />
            </View>
            <View style={{ flexDirection: "row" }}>
              {makeCheckBox("Box1", 0)}
              <Text style={styles.archivedTitle}> Show Archived Requests</Text>
            </View>
          </View>
        }
        data={requests}
        removeClippedSubviews={false}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => listItemView(item)}
        showsVerticalScrollIndicator={false}
      />
      <Modal
        isVisible={deletePopupVisible}
        backdropOpacity={0.25}
        animationInTiming={100}
        animationOutTiming={100}
        style={styles.modalContent}
        onBackdropPress={() => {
          toggleDeletePopupVisibility(!deletePopupVisible);
        }}
      >
        <View
          style={styles.popUpContainer}
          onResponderRelease={onRelease}
          onStartShouldSetResponder={shouldSetResponse}
        >
          <Text style={[styles.popUpHeader, { marginBottom: height * 0.04 }]}>Delete Request?</Text>

          <View
            style={{
              flexDirection: "row",
              position: "absolute",
              bottom: height * 0.03,
            }}
          >
            <TouchableOpacity
              style={{ width: width * 0.6 }}
              onPress={() => {
                // Provide warning
                Alert.alert(
                  "Warning",
                  "Deleting this Request is permanent. Are you sure?",
                  [
                    {
                      text: "Delete",
                      onPress: () => {
                        console.log("Deleting", requestID);
                        updates.deleteRequestTagsOfReq(requestID, getRequests);
                        toggleDeletePopupVisibility(!deletePopupVisible);
                      },
                    },
                    {
                      text: "Cancel",
                      style: "cancel",
                      onPress: () => {
                        toggleDeletePopupVisibility(!deletePopupVisible);
                      },
                    },
                  ]
                );
              }}
            >
              <Text style={styles.plusSign}>Delete</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{ width: width * 0.58 }}
              onPress={() => {
                toggleDeletePopupVisibility(!deletePopupVisible);
              }}
            >
              <Text style={styles.plusSign}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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

  checkBox: {
    margin: 5,
    height: width * 0.08,
    width: width * 0.08,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: width * 0.065,
  },

  active: {
    backgroundColor: "#D6C396",
  },
  inactiveCheckBox: {
    borderColor: "#D6C396",
    borderWidth: 2,
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
    backgroundColor: "#E8E7E4",
    alignItems: "center",
  },

  popUpHeader: {
    flex: 0,
    fontSize: 16,
    color: "#003A63",
    fontWeight: "700",
    padding: height * 0.01,
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
  },
  archivedTitle: {
    color: "#7E8C96",
    fontSize: 15,
    fontWeight: "700",
    marginTop: height * 0.013,
    marginLeft: width * 0.04,
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
  plusSign: {
    color: "#003a63",
    fontSize: 15,
    fontWeight: "700",
    textAlign: "center",
  },
});

export default AllReqs;
