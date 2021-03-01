import React, { useEffect, useState } from "react";
import {
  Image,
  TouchableOpacity,
  Dimensions,
  FlatList,
  Alert,
  SafeAreaView,
} from "react-native";
import { StyleSheet, Button, Text, View } from "react-native";
import * as queries from "../database/query";
import * as updates from "../database/update";
import { Category } from "../database/objects";
import Modal from "react-native-modal";
import { checkBooks } from "../database/bookKeeping";
import * as scheduler from "../schedule/scheduler";

var { height, width } = Dimensions.get("window");

const RequestsScreen = ({ route, navigation }) => {
  let [requests, setRequests] = useState([]);
  let [deletePopupVisible, toggleDeletePopupVisibility] = useState(false);
  let [requestID, setRequestID] = useState(-1);

  useEffect(() => {
    queries.getRequestsInCategory(route.params.cat_id, (results) => {
      setRequests(results);
    });
    checkBooks();
  }, []);

  let refreshPage = () => {
    setTimeout(() => {
      queries.getRequestsInCategory(route.params.cat_id, (results) =>
        setRequests(results)
      );
      scheduler.rescheduleNotifs();
    }, 150);
  };

  let listItemView = (request) => {
    return (
      <TouchableOpacity
        key={request.id}
        style={styles.requestContainer}
        onPress={() => {
          navigation.navigate("IndividualRequest", {
            cat_name: route.params.cat_name,
            req_id: request.id,
            isNewReq: false,
          });
        }}
        onLongPress={() => {
          setRequestID(request.id);
          toggleDeletePopupVisibility(!deletePopupVisible);
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

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View>
          <FlatList
            ListHeaderComponent={
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
                  Requests<Text style={styles.titleAccent}>.</Text>
                </Text>
              </View>
            }
            data={requests}
            showsVerticalScrollIndicator={false}
            removeClippedSubviews={false}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => listItemView(item)}
            ListFooterComponent={
              <View style={styles.addReq}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("IndividualRequest", {
                      cat_name: route.params.cat_name,
                      isNewReq: true,
                      req_id: -1,
                      subject: "Subject",
                      description: "Description",
                    });
                  }}
                  style={styles.createReqButton}
                >
                  <Text style={[styles.plusSign]}>+</Text>
                </TouchableOpacity>
                <Text style={[styles.plusSign, { marginTop: height * 0.01 }]}>
                  {" "}
                  Add Request{" "}
                </Text>
              </View>
            }
          />
        </View>
      </View>

      <Modal
        isVisible={deletePopupVisible}
        backdropOpacity={0.25}
        animationInTiming={400}
        animationOutTiming={800}
        style={styles.modalContent}
        onBackdropPress={() => {
          toggleDeletePopupVisibility(!deletePopupVisible);
        }}
      >
        <View style={styles.popUpContainer}>
          <View>
            <Text style={[styles.popUpHeader, { marginBottom: height * 0.04 }]}>
              Archive Request?
            </Text>
          </View>
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
                  "Are you sure you want to prematurely archive this prayer request? It will auto archive when it expires. ",
                  [
                    {
                      text: "Archive",
                      onPress: () => {
                        updates.archiveRequest(requestID);

                        toggleDeletePopupVisibility(!deletePopupVisible);
                        refreshPage();
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
              <Text style={styles.plusSign}>Archive</Text>
            </TouchableOpacity>

            <TouchableOpacity
              // This is the save button for the edit page?
              style={{ width: width * 0.58 }}
              onPress={() => {
                /* updates.editCategory(selectedCatName, selectedCatID);
                  updates.editTag(selectedCatName, selectedCatID); */
                toggleDeletePopupVisibility(!deletePopupVisible);
                refreshPage();
              }}
            >
              <Text style={styles.plusSign}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  // Overall container for screen
  container: {
    flex: 1,
    backgroundColor: "#EFEFEF",
    alignItems: "center",
    marginTop: height * 0.005,
  },

  requestContainer: {
    width: width * 0.85,
    height: height * 0.08,
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
    color: "#003A63",
    fontSize: 46,
    fontWeight: "700",
    marginRight: width * 0.15,
  },

  titleAccent: {
    color: "#D6C396",
    fontSize: 46,
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
