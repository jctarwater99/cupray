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
import { CheckBox } from "react-native-elements";
import * as queries from "../database/query";
import * as updates from "../database/update";
import * as inserts from "../database/insert";
import { Category } from "../database/objects";
import { Dropdown } from "react-native-material-dropdown-v2";

import { LogBox } from "react-native";

// Ignore log notification by message
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

  let [inEditMode, setMode] = useState(route.params.isNewReq);
  let [checked, setBoxes] = useState([true, true, false]);
  let [subject, setSubject] = useState("");
  let [description, setDescription] = useState("");
  let [category, setCategory] = useState(route.params.cat_name); //

  useEffect(() => {
    // Loads request
    queries.getRequest(route.params.req_id, (results) => {
      setRequest(results);
      setDescription(results.description);
      setSubject(results.subject);

      let state = [true, true, false];
      if (results.priority == 2) {
        state[2] = true;
      } else if (results.priority == 0) {
        state[1] = false;
      }
      setBoxes(state);
    });
    // Loads categories
    queries.getCategories((results) => {
      let dropDownData = [];
      results.forEach((element) => {
        dropDownData.push({ value: element.name, id: element.tagID });
      });
      setCategories(dropDownData);
    });
    queries.getTagsForRequest(route.params.req_id, (results) =>
      setRTags(results)
    );
    queries.getTags((results) => setTags(results));
  }, []);

  let saveChanges = () => {
    // Creating request to pass to the update field
    req = new Request();
    req.subject = subject;
    req.description = description;

    req.expire_time = request.expire_time;
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

    let catID = -1;
    categories.forEach((element) => {
      if (element.value == category) {
        catID = element.id;
      }
    });
    // Actuall update part
    if (route.params.isNewReq) {
      inserts.insertNewRequest(req, catID);
    } else {
      console.log(req);
      console.log("Old ID:", route.params.cat_id, "/nNew ID:", catID);
      updates.updateRequest(route.params.req_id, req);
      updates.updateRequestTag(route.params.req_id, route.params.cat_id, catID);
    }

    // Remove later???
    navigation.navigate("Cat");

    // Queries to Update any tags??
    // Queries to Update categores??
    // Queries to Updadate request tags??

    // if is new request
    //  add category tag
    // else
    //  update category tag

    // On change tags,
    // if added
    //  add them to added tags array
    // else
    //  add then to deleted tags array
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

  let makeCheckBox = (cBoxTitle, stateVar) => {
    return (
      <CheckBox
        id={cBoxTitle}
        style={styles.checkBox}
        checkedIcon="circle"
        uncheckedIcon="circle-o"
        margin={"50%"}
        size={40}
        onPress={() => {
          if (inEditMode) {
            handleCheckBoxPress(cBoxTitle);
          }
        }}
        checked={stateVar}
        checkedColor={"#D6C396"}
        uncheckedColor={"#D6C396"}
      ></CheckBox>
    );
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
                setCategory(text);
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

              <Text
                onPress={() => {
                  console.log(dropdownCatNames);
                }}
                style={styles.boxheaders}
              >
                Priority
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  marginTop: 0,
                  padding: 0,
                  alignItems: "flex-end",
                  //justifyContent: "flex-end",
                }}
              >
                {makeCheckBox("Box1", checked[0])}
                {makeCheckBox("Box2", checked[1])}
                {makeCheckBox("Box3", checked[2])}
              </View>
              {/* these are not yet dynamic */}
              <Text style={styles.boxheaders}>Tags</Text>
              <Text style={styles.subtitle}>Family</Text>

              <Text style={styles.boxheaders}>Frequency</Text>
              <Text style={styles.subtitle}>Daily</Text>

              <Text style={styles.boxheaders}>Reminder Expiration</Text>
              <Text style={styles.subtitle}>11/24/2020</Text>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  } else {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <Text style={styles.title}>{subject}</Text>

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
                {makeCheckBox("Box1", checked[0])}
                {makeCheckBox("Box2", checked[1])}
                {makeCheckBox("Box3", checked[2])}
              </View>
              <Text style={styles.boxheaders}>Tags</Text>
              <Text style={styles.subtitle}>Family</Text>

              <Text style={styles.boxheaders}>Frequency</Text>
              <Text style={styles.subtitle}>Daily</Text>

              <Text style={styles.boxheaders}>Reminder Expiration</Text>
              <Text style={styles.subtitle}>11/24/2020</Text>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
};

const styles = StyleSheet.create({
  checkBox: {
    backgroundColor: "#D6C396",
  },

  // Overall container for screen
  container: {
    flex: 1,
    backgroundColor: "#EFEFEF",
    alignItems: "center",
    marginTop: height * 0.02,
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
    overflow: "visible",

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
});

export default ThisRequestScreen;
