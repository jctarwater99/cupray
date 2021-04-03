import React, { useEffect, useState } from "react";
import {
  Image,
  TouchableOpacity,
  Dimensions,
  TextInput,
  FlatList,
  Alert,
} from "react-native";
import { StyleSheet, Text, View } from "react-native";
import * as queries from "../database/query";
import * as updates from "../database/update";
import * as inserts from "../database/insert";
import Modal from "react-native-modal";
import { checkBooks } from "../database/bookKeeping";

var { height, width } = Dimensions.get("window");

const AllTags = ({ navigation }) => {
  let [tags, setTags] = useState([]);
  let [editPopupVisible, toggleEditPopupVisibility] = useState(false);
  let [isNewTag, setIsNewTag] = useState(false);
  let [selectedTagName, setSelectedTagName] = useState("");
  let [selectedTag, setSelectedTag] = useState();

  useEffect(() => {
    queries.getTagsForTagsPage(setTags);
    checkBooks();
  }, []);

  let refreshPage = () => {
    setTimeout(() => {
      queries.getTagsForTagsPage(setTags);
    }, 200);
  };

  let listItemView = (tag, index) => {
    return (
      <TouchableOpacity
        key={tag.id}
        style={[
          styles.requestContainer,
          tags[index].isCategory ? styles.oneWay : styles.otherWay,
        ]}
        onPress={() => {
          setIsNewTag(false);
          setSelectedTagName(tag.name);
          setSelectedTag(tag);
          toggleEditPopupVisibility(!editPopupVisible);
        }}
      >
        <View style={styles.circle} />
        <Text style={styles.requestTitles}>{tag.name}</Text>
        <View style={{ flex: 1 }}></View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={
          <View style={{ flexDirection: "row", marginRight: width * 0.2 }}>
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
              All Tags<Text style={styles.titleAccent}>.</Text>
            </Text>
          </View>
        }
        data={tags}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => listItemView(item, index)}
        showsVerticalScrollIndicator={false}
        removeClippedSubviews={false}
        ListFooterComponent={
          <View style={styles.addReq}>
            <TouchableOpacity
              onPress={() => {
                setIsNewTag(true);
                setSelectedTagName("e.g. Jerry");
                toggleEditPopupVisibility(!editPopupVisible);
              }} // goto create category page or popup or something
              style={styles.createReqButton}
            >
              <Text style={styles.plusSign}>+</Text>
            </TouchableOpacity>
            <Text style={[styles.plusSign, { marginTop: height * 0.01 }]}>
              Add Tag
            </Text>

            <Modal
              isVisible={editPopupVisible}
              backdropOpacity={0.25}
              animationInTiming={200}
              animationOutTiming={600}
              style={styles.modalContent}
              onBackdropPress={() => {
                toggleEditPopupVisibility(!editPopupVisible);
              }}
            >
              <View style={styles.popUpContainer}>
                <Text style={styles.popUpHeader}>Edit Tag</Text>
                <TextInput
                  maxLength={15} // max number of chars
                  multiline={true}
                  value={selectedTagName}
                  onFocus={() => {
                    if (isNewTag) {
                      setSelectedTagName("");
                    }
                  }}
                  onChangeText={(text) => setSelectedTagName(text)}
                  style={{
                    backgroundColor: "white",
                    color: "#7E8C96",
                    padding: 5,
                    borderRadius: 5,
                    textAlignVertical: "top",
                    fontWeight: "600",
                    alignSelf: "stretch",
                    textAlign: "center",
                    marginLeft: width * 0.1,
                    marginRight: width * 0.1,
                    marginBottom: height * 0.05,
                  }}
                />

                <View
                  style={{
                    flexDirection: "row",
                    position: "absolute",
                    bottom: height * 0.03,
                  }}
                >
                  <TouchableOpacity
                    style={[
                      { width: width * 0.6 },
                      isNewTag ? { display: "none" } : {},
                    ]}
                    onPress={() => {
                      // Provide warning
                      Alert.alert(
                        "Warning",
                        "Deleting this Tag could cause requests associated with it to archive automatically. Are you sure?",
                        [
                          {
                            text: "Delete",
                            onPress: () => {
                              let id = selectedTag.id;
                              updates.deleteRequestTagsOfTag(id);
                              if (selectedTag.isCategory) {
                                updates.archiveRequestsInCategory(id);
                                updates.deleteCategory(id);
                              }
                              updates.deleteTag(id);
                              toggleEditPopupVisibility(!editPopupVisible);
                              refreshPage();
                            },
                          },
                          {
                            text: "Cancel",
                            style: "cancel",
                            onPress: () => {
                              toggleEditPopupVisibility(!editPopupVisible);
                            },
                          },
                        ]
                      );
                    }}
                  >
                    <Text style={styles.plusSign}>Delete</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    // This is the save button for the edit page?
                    style={{ width: width * 0.58 }}
                    onPress={() => {
                      if (isNewTag) {
                        inserts.insertTag({ name: selectedTagName });
                      } else {
                        let id = selectedTag.id;
                        updates.editTag(selectedTagName, id);
                        if (selectedTag.isCategory) {
                          updates.editCatName(selectedTagName, id);
                        }
                      }
                      toggleEditPopupVisibility(!editPopupVisible);
                      refreshPage();
                    }}
                  >
                    <Text style={styles.plusSign}>Save</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          </View>
        }
      />
    </View> // Nested much? lol
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

    elevation: 6,
    borderRadius: 10,
    backgroundColor: "#E8E7E4",
    margin: height * 0.01,
  },

  requestTitles: {
    color: "#7E8C96",
    fontSize: width * 0.05,
    fontWeight: "700",
    marginTop: height * 0.022,
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
    borderWidth: 3,
    borderColor: "#D6C396",
    marginTop: height * 0.02,
    marginLeft: width * 0.05,
  },

  title: {
    color: "#003A63",
    fontSize: width * 0.12,
    fontWeight: "700",
    marginBottom: height * 0.01,
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
    marginTop: height * 0.003,
  },

  popUpContainer: {
    width: 327,
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
export default AllTags;
