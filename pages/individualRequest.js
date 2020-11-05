import React, { useEffect, useState } from "react";
import {
  Image,
  TouchableOpacity,
  Dimensions,
  FlatList,
  SafeAreaView,
  ScrollView,
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

var { height, width } = Dimensions.get("window");

const ThisRequestScreen = ({ route, navigation }) => {
  let [request, setRequest] = useState([]);
  let [dld, setDLD] = useState(route.params.isNew);
  let [checked, setBoxes] = useState([true, true, false]);

  useEffect(() => {
    queries.getRequest(route.params.req_id, (results) => setRequest(results));
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
        checkedIcon="circle"
        uncheckedIcon="circle-o"
        margin={'50%'}
        size={40}
        onPress={() => handleCheckBoxPress(cBoxTitle)}
        checked={stateVar}
        checkedColor={"#D6C396"}
        uncheckedColor={"#D6C396"}
        
      ></CheckBox>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
      <Text style={styles.title}>{request.subject}</Text>

      <View style={{flexDirection: 'row', alignSelf: 'stretch', justifyContent: 'space-between'}}> 
      <Text style={{width: 95}}></Text>
      <Text style={styles.subtitle}>{route.params.cat_name} </Text>
      <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editButtonText}>EDIT</Text>
      </TouchableOpacity>

      </View>
          <ScrollView style={styles.requestContainer}>
        <View>
          <View>
          <Text style={styles.boxheaders}>Description</Text>
            <TextInput
              placeholder="But I must explain to you how all this 
              mistaken idea of denouncing pleasure 
              and praising pain was born and I will 
              give you a complete account of the system, 
              and expound the actual teachings of the 
              great explorer of the truth, 
              the master-builder of human happiness. "
              numberOfLines={4}
              maxLength={100} // max number of chars
              multiline = {true}
              style={{ backgroundColor: "white",  padding: 5, marginBottom: 20, textAlignVertical: 'top'}}
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
    marginTop: height * 0.05,
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
