import React, { useEffect, useState } from "react";
import {
  Image,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  ScrollView,
  TextInput,
  StyleSheet,
  Button,
  Text,
  View,
} from "react-native";
import * as queries from "../database/query";
import * as updates from "../database/update";
import * as inserts from "../database/insert";
import { Category, Tag } from "../database/objects";
import Modal from "react-native-modal";
import { Dropdown } from "react-native-material-dropdown-v2";
import DateTimePicker from "@react-native-community/datetimepicker";

// Ignore log notification by message
import { LogBox } from "react-native";
LogBox.ignoreLogs([
  "Warning: componentWillReceiveProps has been renamed, and is not recommended for use. See https://fb.me/react-unsafe-component-lifecycles for details.",
]);
LogBox.ignoreLogs([
  "Animated: `useNativeDriver` was not specified. This is a required option and must be explicitly set to `true` or `false`",
]);

var { height, width } = Dimensions.get("window");

const ThisRequestScreen = ({ route, navigation }) => {
  let [request, setRequest] = useState([]);
  let [categories, setCategories] = useState([]);
  let [tags, setTags] = useState([]);
  let [requestTags, setRTags] = useState([]);
  let [tagStates, setTagStates] = useState([]);
  let [changedTags, changeTags] = useState([]);
  let [expireTime, setExpireTime] = useState("");
  let [selectedDate, setSelectedDate] = useState(new Date());
  let [displayDate, setDisplayDate] = useState("");

  let [inEditMode, setMode] = useState(route.params.isNewReq);
  let [checked, setBoxes] = useState([true, true, false]);
  let [subject, setSubject] = useState("");
  let [description, setDescription] = useState("");
  let [category, setCategory] = useState(route.params.cat_name);
  let [newTagPopup, toggleNewTagPopup] = useState(false);
  let [datePickerVisible, setDatePickerVisibility] = useState(false);
  let [newTag, setNewTag] = useState("");

  useEffect(() => {
    // Loads request
    queries.getRequest(route.params.req_id, (results) => {
      setRequest(results);
      setDescription(results.description);
      setSubject(results.subject);

      let date = new Date();
      if (!route.params.isNewReq) {
        date = new Date(results.expire_time);
      }
      parseDate(date, setDisplayDate);
      setSelectedDate(date);

      let state = [true, true, false];
      if (results.priority == 2) {
        state[2] = true;
      } else if (results.priority == 0) {
        state[1] = false;
      }
      setBoxes(state);
    });

    queries.getTagsForRequest(route.params.req_id, (rTags) => {
      setRTags(rTags);
      queries.getTags((tags) => {
        setTags(tags);

        let i = 0;
        let newTagValues = [];
        let changeValues = [];
        for (const tag in tags) {
          if (rTags.length > 0 && tags[tag].name == rTags[i].name) {
            if (i != rTags.length - 1) {
              i++;
            }
            newTagValues.push(1);
          } else newTagValues.push(0);
          changeValues.push(0);
        }
        if (route.params.isNewReq && route.params.cat_name != "Category") {
          for (const tag in tags) {
            if (tags[tag].name == route.params.cat_name) {
              newTagValues[tag] = 1;
              changeValues[tag] = 1;
            }
          }
        }
        setTagStates(newTagValues);
        changeTags(changeValues);
      });
    });
    if (Platform.OS == "ios") {
      setDatePickerVisibility(true);
    }

    // Loads categories
    queries.getCategories((results) => {
      let dropDownData = [];
      results.forEach((element) => {
        dropDownData.push({ value: element.name, id: element.tagID });
      });
      setCategories(dropDownData);
    });
  }, []);

  let refreshPage = () => {
    setTimeout(() => {
      queries.getTags((tags) => {
        setTags(tags);
      });
    }, 200);
  };

  let handleTagPress = (number) => {
    if (category == tags[number].name || tags[number].name == "Archived") {
      return;
    }

    let states = [...tagStates]; // can't change states manually, must create deep copy
    states[number] = !states[number];
    setTagStates(states);

    // Keep track of which tags changed so we know what to add or delete
    let changed = [...changedTags];
    changed[number] = !changed[number];
    changeTags(changed);
  };

  let createButton = (name, index) => {
    return (
      <TouchableOpacity
        key={index}
        onPress={() => handleTagPress(index)}
        style={[
          styles.tagBubble,
          name == "Archived"
            ? styles.hidden
            : tagStates[index]
            ? styles.active
            : inEditMode
            ? styles.inactive
            : styles.hidden,
        ]}
      >
        <Text
          style={[
            styles.tagBubbleText,
            tagStates[index] ? styles.activeText : styles.inactiveText,
          ]}
        >
          {name}
        </Text>
      </TouchableOpacity>
    );
  };

  let newTagButton = (name, index) => {
    return (
      <TouchableOpacity
        key={index}
        onPress={() => toggleNewTagPopup(!newTagPopup)}
        style={[styles.tagBubble, inEditMode ? styles.inactive : styles.hidden]}
      >
        <Text style={[styles.tagBubbleText, styles.inactiveText]}>{name}</Text>
      </TouchableOpacity>
    );
  };

  let tagButtons = () => {
    let buttonList = [];
    let i = 0;
    for (const tag of tags) {
      buttonList.push(createButton(tag.name, i));
      i++;
    }
    buttonList.push(newTagButton("New Tag", i));
    return buttonList;
  };

  let saveChanges = () => {
    // Creating request to pass to the update field
    let req = new Request();
    req.subject = subject;
    req.description = description;

    req.expire_time = String(selectedDate);
    req.remind_freq = request.remind_freq;
    req.remind_days = request.remind_days;
    req.remind_time = request.remind_time;

    let priority = 0;
    if (checked[2]) {
      priority = 2;
    } else if (checked[1]) {
      priority = 1;
    }
    req.priority = priority;

    // If the user didn't select a category, don't save
    if (route.params.isNewReq && category == "Category") {
      setMode(true);
      return;
    }

    // TODO: Double check that these 6 lines are unneeded, then delete
    let catID = -1;
    categories.forEach((element) => {
      if (element.value == category) {
        catID = element.id;
      }
    });

    // Actuall update part
    updates.updateRequest(route.params.req_id, req);

    for (const tag in changedTags) {
      if (changedTags[tag] == 1 && tagStates[tag] == 1) {
        inserts.insertRequestTag({
          requestID: route.params.req_id,
          tagID: tags[tag].id,
        });
      } else if (changedTags[tag] == 1) {
        updates.deleteRequestTag({
          requestID: route.params.req_id,
          tagID: tags[tag].id,
        });
      }
    }

    if (route.params.isNewReq) {
      // Create New "New Request"
      inserts.insertRequest({ subject: "Subject", description: "Description" });
      //updates.updateActiveReqCount(route.params.cat_id);
      navigation.navigate("Cat");
    }
  };

  let handleCheckBoxPress = (box) => {
    let newState = [];
    if (box == "Box1") {
      newState = [true, false, false];
    } else if (box == "Box2") {
      newState = [true, true, false];
    } else {
      newState = [true, true, true];
    }

    setBoxes(newState);
  };

  let makeCheckBox = (cBoxTitle, index) => {
    return (
      <TouchableOpacity
        id={cBoxTitle}
        style={[
          styles.checkBox,
          checked[index] ? styles.active : styles.inactiveCheckBox,
        ]}
        onPress={() => {
          if (inEditMode) {
            handleCheckBoxPress(cBoxTitle);
          }
        }}
      ></TouchableOpacity>
    );
  };

  let datePickerButton = Platform.select({
    ios: () => {
      return (
        <TouchableOpacity
          onPress={() => {
            setDatePickerVisibility(true);
          }}
          style={{ width: 250 }}
        ></TouchableOpacity>
      );
    },
    android: () => {
      return (
        <TouchableOpacity
          onPress={() => {
            setDatePickerVisibility(true);
          }}
          style={[styles.androidTimeButton, { marginBottom: height * 0.06 }]}
        >
          <Text style={styles.androidTimeHeader}>{displayDate}</Text>
        </TouchableOpacity>
      );
    },
  })();
  let datePicker = Platform.select({
    ios: () => {
      if (datePickerVisible) {
        return (
          <DateTimePicker
            value={selectedDate} // this value needs to be read from database
            mode={"date"}
            display="default"
            onChange={(event, date) => {
              handleChangeDate(event, date);
            }}
          />
        );
      }
    },
    android: () => {
      if (datePickerVisible) {
        return (
          <DateTimePicker
            value={selectedDate}
            mode={"date"}
            is24Hour={false}
            display="default"
            onChange={(event, date) => {
              handleChangeDate(event, date);
            }}
          />
        );
      }
    },
  })();

  const handleChangeDate = (event, selectedDate) => {
    setDatePickerVisibility(Platform.OS === "ios"); // This is pretty creative, I like it :)
    if (event.type == "dismissed") {
      return;
    }
    const newDate = selectedDate || selectedTime;
    setSelectedDate(newDate);
    parseDate(newDate, setDisplayDate);
  };

  let parseDate = (date, callback) => {
    let day = String(date).split(" ")[2];
    let month = date.getMonth() + 1; // Months are 0 indexed
    let year = date.getFullYear(); // 2021 returns 121 instead if we call getYear??

    let parsedDate =
      month.toString() + "/" + day.toString() + "/" + year.toString();
    callback(parsedDate);
  };

  if (inEditMode) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          {/*subject*/}
          <TextInput
            defaultValue={"Enter Subject"}
            style={{ marginTop: height * 0.02 }}
            maxLength={25} // max number of chars
            multiline={false}
            onFocus={() => {
              if (route.params.isNewReq) {
                setSubject("");
              }
            }}
            value={subject}
            onChange={(text) => setSubject(text.nativeEvent.text)}
            style={[styles.title, { backgroundColor: "white", padding: 5 }]}
          />

          <View
            style={{
              flexDirection: "row",
              alignSelf: "stretch",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ width: 95 }}></Text>
            {/*Category*/}
            <Dropdown
              defaultValue={route.params.cat_name}
              style={{ width: 100, height: 40, fontWeight: "600" }}
              itemTextStyle={{
                fontWeight: "600",
              }}
              itemCount={6}
              dropdownPosition={0}
              textColor="#7E8C96"
              data={categories}
              onChangeText={(text) => {
                let oldCat = category;
                let newCat = text;
                setCategory(text);

                let states = [...tagStates]; // can't change manually, must create deep copy
                let changed = [...changedTags];

                for (const tag in tags) {
                  if (tags[tag].name == oldCat) {
                    states[tag] = !states[tag];
                    changed[tag] = !changed[tag];
                  }
                  if (tags[tag].name == newCat) {
                    states[tag] = 1;
                    changed[tag] = !changed[tag];
                  }
                }
                setTagStates(states);
                changeTags(changed);
              }}
            />
            <TouchableOpacity
              onPress={() => {
                setMode(false);
                saveChanges();
              }}
              style={styles.editButton}
            >
              <Text style={styles.editButtonText}>SAVE</Text>
            </TouchableOpacity>
          </View>
          <ScrollView style={styles.requestContainer}>
            <View>
              <View>
                <Text style={styles.boxheaders}>Description</Text>
                <TextInput
                  numberOfLines={4}
                  maxLength={300} // max number of chars
                  multiline={true}
                  onFocus={() => {
                    if (route.params.isNewReq) {
                      setDescription("");
                    }
                  }}
                  value={description}
                  onChange={(text) => setDescription(text.nativeEvent.text)}
                  style={{
                    backgroundColor: "white",
                    color: "#7E8C96",
                    padding: 5,
                    marginBottom: 20,
                    textAlignVertical: "top",
                    fontWeight: "600",
                  }}
                />
              </View>

              <Text style={styles.boxheaders}>Priority</Text>
              <View
                style={{
                  flexDirection: "row",
                  marginTop: 0,
                  padding: 0,
                  alignItems: "flex-end",
                  //justifyContent: "flex-end",
                }}
              >
                {makeCheckBox("Box1", 0)}
                {makeCheckBox("Box2", 1)}
                {makeCheckBox("Box3", 2)}
              </View>
              {/* these are not yet dynamic */}
              <Text style={styles.boxheaders}>Tags</Text>
              <View
                style={[
                  {
                    flexDirection: "row",
                    alignSelf: "flex-start",
                    flexWrap: "wrap",
                  },
                ]}
              >
                {tagButtons()}
              </View>

              <Modal
                isVisible={newTagPopup}
                backdropOpacity={0.25}
                animationInTiming={400}
                animationOutTiming={800}
                style={styles.modalContent}
                onBackdropPress={() => {
                  toggleNewTagPopup(!newTagPopup);
                }}
              >
                <View style={styles.popUpContainer}>
                  <Text style={styles.popUpHeader}>Create New Tag</Text>
                  <TextInput
                    maxLength={15} // max number of chars
                    multiline={true}
                    value={newTag}
                    onFocus={() => ""}
                    onChange={(text) => setNewTag(text.nativeEvent.text)}
                    style={{
                      backgroundColor: "white",
                      color: "#7E8C96",
                      padding: 8,
                      textAlignVertical: "top",
                      fontWeight: "600",
                      alignSelf: "stretch",
                      textAlign: "center",
                      marginLeft: width * 0.1,
                      marginRight: width * 0.1,
                    }}
                  />
                  <View style={[{ flexDirection: "row" }]}>
                    <TouchableOpacity
                      onPress={() => {
                        toggleNewTagPopup(!newTagPopup);
                      }}
                    >
                      <Text style={styles.popUpHeader}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{ marginLeft: width * 0.45 }}
                      onPress={() => {
                        toggleNewTagPopup(!newTagPopup);
                        let tag = new Tag();
                        tag.name = newTag;
                        inserts.insertTag(tag);
                        refreshPage();
                      }}
                    >
                      <Text style={styles.popUpHeader}>Save</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>

              <Text style={styles.boxheaders}>Frequency</Text>
              <Text style={styles.subtitle}>Daily</Text>

              <Text style={styles.boxheaders}>Reminder Expiration</Text>

              <View>
                {datePickerButton}
                {datePicker}
              </View>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  } else {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <View
            style={{
              flexDirection: "row",
            }}
          >
            <TouchableOpacity
              style={{ justifyContent: "flex-start" }}
              onPress={() => navigation.openDrawer()}
            >
              <Image
                style={{
                  marginRight: width * 0.05,
                  marginTop: height * 0.023,
                  width: 30,
                  height: 30,
                }}
                source={require("../assets/hamburger.png")}
              ></Image>
            </TouchableOpacity>
            <Text style={styles.title}>{subject}</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignSelf: "stretch",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ width: 95 }}></Text>
            <Text style={styles.subtitle}>{route.params.cat_name} </Text>
            <TouchableOpacity
              onPress={() => setMode(true)}
              style={styles.editButton}
            >
              <Text style={styles.editButtonText}>EDIT</Text>
            </TouchableOpacity>
          </View>
          <ScrollView style={styles.requestContainer}>
            <View>
              <View>
                <Text style={styles.boxheaders}>Description</Text>
                <Text
                  style={{
                    padding: 5,
                    color: "#7E8C96",
                    marginBottom: 20,
                    textAlignVertical: "top",
                    fontWeight: "600",
                  }}
                >
                  {description}
                </Text>
              </View>

              <Text style={styles.boxheaders}>Priority</Text>
              <View
                style={{
                  flexDirection: "row",
                  marginTop: 0,
                  padding: 0,
                  alignItems: "flex-end",
                  //justifyContent: "flex-end",
                }}
              >
                {makeCheckBox("Box1", 0)}
                {makeCheckBox("Box2", 1)}
                {makeCheckBox("Box3", 2)}
              </View>
              <Text style={styles.boxheaders}>Tags</Text>
              <View
                style={[
                  {
                    flexDirection: "row",
                    alignSelf: "flex-start",
                    flexWrap: "wrap",
                  },
                ]}
              >
                {tagButtons()}
              </View>

              <Text style={styles.boxheaders}>Frequency</Text>
              <Text style={styles.subtitle}>Daily</Text>

              <Text style={styles.boxheaders}>Reminder Expiration</Text>
              <Text style={styles.subtitle}>{displayDate}</Text>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
};

const styles = StyleSheet.create({
  checkBox: {
    margin: 3,
    height: 35,
    width: 35,
    borderRadius: 35,
    alignItems: "center",
    justifyContent: "center",
  },

  // Overall container for screen
  container: {
    flex: 1,
    backgroundColor: "#EFEFEF",
    alignItems: "center",
    marginTop: height * 0.002,
  },

  requestContainer: {
    width: 327,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.27,
    shadowRadius: 3.65,
    overflow: "scroll",

    elevation: 6,
    borderRadius: 20,
    backgroundColor: "#E8E7E4",
    margin: height * 0.02,
    padding: 23,
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
    marginBottom: height * 0.01,
    marginTop: height * 0.02,
  },
  subtitle: {
    color: "#7E8C96",
    fontSize: 20,
    fontWeight: "700",
    marginBottom: height * 0.02,
  },
  boxheaders: {
    color: "#003A63",
    fontSize: 20,
    fontWeight: "700",
    marginBottom: height * 0.01,
  },

  editButton: {
    width: 70,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.27,
    shadowRadius: 2.65,

    elevation: 6,
    borderRadius: 10,
    backgroundColor: "#7E8C96",
    marginRight: width * 0.06,
  },

  editButtonText: {
    color: "#EFEFEF",
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
    marginTop: height * 0.01,
  },

  tagBubble: {
    flexDirection: "row",
    alignSelf: "flex-start",
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "#D6C396",
    marginBottom: height * 0.01,
    marginRight: width * 0.01,
  },

  tagBubbleText: {
    color: "#D6C396",
    fontSize: 15,
    fontWeight: "700",
    textAlign: "center",
    padding: 2,
  },

  active: {
    backgroundColor: "#D6C396",
  },
  inactiveCheckBox: {
    backgroundColor: "#D3D3D3",
  },
  inactive: {},
  activeText: {
    color: "#EFEFEF",
  },
  inactiveText: {
    color: "#D6C396",
  },
  hidden: {
    display: "none",
  },

  modalContent: {
    justifyContent: "center",
    alignItems: "center",
    margin: 0,
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

  androidTimeHeader: {
    flex: 0,
    fontSize: 16,
    color: "#E8E7E4",
    fontWeight: "700",
    padding: height * 0.008,
  },

  androidTimeButton: {
    alignSelf: "flex-start",
    borderRadius: 6,
    backgroundColor: "#D6C396",
    padding: 3,
  },
});

export default ThisRequestScreen;
