import React, { useEffect, useState } from "react";
import {
  Image,
  TouchableOpacity,
  Dimensions,
  FlatList,
  SafeAreaView,
  TextInput,
  TextArea,
  StyleSheet,
  Button,
  Text,
  View,
} from "react-native";
import { CheckBox } from "react-native-elements";
import * as queries from "../database/query";
import { Category } from "../database/objects";
import RadioButtonRN from "radio-buttons-react-native";

var { height, width } = Dimensions.get("window");

const RefactorRequestScreen = ({ route, navigation }) => {
  let [request, setRequest] = useState([]);
  let [tags, setTags] = useState([]);
  let [categories, setCategories] = useState([]);
  let [requestCategory, setRC] = useState("None");
  let [requestTags, setRTags] = useState([]);
  let [dld, setDLD] = useState(route.params.isNew);
  let [checked, setBoxes] = useState([true, true, false]);

  useEffect(() => {
    queries.getRequest(route.params.req_id, (results) => setRequest(results));
    queries.getTags((results) => setTags(results));
    queries.getCategories((results) => setCategories(results));
    queries.getTagsForRequest(route.params.req_id, (results) => {
      setRTags(results);
      console.log("Tags", results);
    });
  }, []);

  const data = [
    {
      label: "low",
    },
    {
      label: "medium",
    },
    {
      label: "high",
    },
  ];

  const temp = () => {
    return (
      <View>
        <Text>Hello</Text>
      </View>
    );
  };

  const temp2 = () => {
    return (
      <View>
        <Text>Hi</Text>
      </View>
    );
  };
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
  {
    /*
  if (dld) {
    return (
      <SafeAreaView style={{ flex: 1, marginTop: height * 0.4 }}>
        <Button
          title="testy"
          onPress={() => {
            console.log("changed");
            setDLD(false);
          }}
        >
          <Text>test</Text>
        </Button>
        {temp()}
      </SafeAreaView>
    );
  } else {
    return (
      <SafeAreaView style={{ flex: 1, marginTop: height * 0.4 }}>
        <Button
          title="testy2"
          onPress={() => {
            console.log("changed");
            setDLD(true);
          }}
        >
          <Text>test</Text>
        </Button>
        {temp2()}
      </SafeAreaView>
    );
  } */
  }

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
        checkedIcon="dot-circle-o"
        uncheckedIcon="circle-o"
        onPress={() => handleCheckBoxPress(cBoxTitle)}
        checked={stateVar}
      ></CheckBox>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.title}>{request.subject}</Text>
        <View>
          <View>
            <Button
              title="PMTT"
              onPress={() => {
                console.log(request.id);
              }}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              margin: 0,
              padding: 0,
              alignItems: "flex-end",
              //justifyContent: "flex-end",
            }}
          >
            {makeCheckBox("Box1", checked[0])}
            {makeCheckBox("Box2", checked[1])}
            {makeCheckBox("Box3", checked[2])}
          </View>
          <View>
            <TextInput
              placeholder="Temporary Filler"
              numberOfLines={4}
              maxLength={100} // max number of chars
              style={{ backgroundColor: "white", marginTop: 30, padding: 5 }}
            />
          </View>
          <View style={{ margin: 10 }} />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  checkbox: { minWidth: 0, minHeight: 0 },

  // Overall container for screen
  container: {
    flex: 1,
    backgroundColor: "#EFEFEF",
    alignItems: "center",
    marginTop: height * 0.02,
  },

  requestContainer: {
    width: 327,
    height: 540,
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
    marginTop: height * 0.02,
    marginLeft: width * 0.05,
  },

  title: {
    color: "#003A63",
    fontSize: 30,
    fontWeight: "700",
    marginBottom: height * 0.05,
    marginTop: height * 0.05,
  },
});

export default RefactorRequestScreen;
