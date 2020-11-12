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
import { Category } from "../database/objects";

import DropDownPicker from "react-native-dropdown-picker";

var { height, width } = Dimensions.get("window");

const ThisRequestScreen = ({ route, navigation }) => {
  let [request, setRequest] = useState([]);
  let [tags, setTags] = useState([]);
  let [categories, setCategories] = useState([]);
  let [requestCategory, setRC] = useState("None");
  let [requestTags, setRTags] = useState([]);
  let [inEditMode, setMode] = useState(route.params.isNewReq);
  let [checked, setBoxes] = useState([true, true, false]);
  let [description, setDescription] = useState("");
  let [subject, setSubject] = useState("");

  let [country, setCountry] = useState("uk");

  useEffect(() => {
    queries.getRequest(route.params.req_id, (results) => {
      setRequest(results);
      setDescription(results.description);
      setSubject(results.subject);
    });
    queries.getCategories((results) => setCategories(results));
    queries.getTagsForRequest(route.params.req_id, (results) =>
      setRTags(results)
    );
    queries.getTags((results) => setTags(results));
  }, []);

  {
    /*
    I think we want something along the lines of the following

    if editMode
      return
        button: save -> onPress -> db call, edit mode = false
        textbox: title
        dropdown: category
        textbox: etc
        buttons, with on press function

    else
      return
        button: edit -> onPress -> edit mode = true
        text: title
        text: category
        text: etc
        buttons, but with no on press function
  */
  }
  let saveChanges = () => {
    req = new Request();
    req.subject = subject;
    req.description = description;

    req.expire_time = request.expire_time;
    req.remind_freq = request.remind_freq;
    req.remind_time = request.remind_time;
    req.priority = request.priority;

    updates.updateRequest(route.params.req_id, req);

    // Also handle tag and category changes
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
          <TextInput
            style={{ marginTop: height * 0.02 }}
            maxLength={25} // max number of chars
            multiline={false}
            value={subject}
            onChange={(text) => setSubject(text.nativeEvent.text)}
            style={{
              backgroundColor: "white",
              padding: 5,
              marginBottom: 20,
              textAlignVertical: "top",
            }}
          />

          <View
            style={{
              flexDirection: "row",
              alignSelf: "stretch",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ width: 95 }}></Text>
            {/*<Text style={styles.subtitle}>{route.params.cat_name}</Text>*/}
            <DropDownPicker
              items={[
                {
                  label: "USA",
                  value: "usa",
                },
                {
                  label: "UK",
                  value: "uk",
                },
                {
                  label: "France",
                  value: "france",
                },
              ]}
              defaultValue={country}
              containerStyle={{ height: 40 }}
              style={{ backgroundColor: "#fafafa", zIndex: 10 }}
              itemStyle={{
                justifyContent: "flex-start",
              }}
              dropDownStyle={{ backgroundColor: "#fafafa" }}
              onChangeItem={(item) => setCountry(item.value)}
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
                    padding: 5,
                    marginBottom: 20,
                    textAlignVertical: "top",
                    fontWeight: "700",
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
                    marginBottom: 20,
                    textAlignVertical: "top",
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
    minWidth: width * 0.99,
  },

  requestContainer: {
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
    padding: 25,
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
