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

  useEffect(() => {
    queries.getRequest(route.params.id, (results) => setRequest(results));
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

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.title}>{request.subject}</Text>
        <View>
          <View>
            <Button
              title="PMTT"
              onPress={() => {
                console.log(request.subject);
              }}
            />
          </View>
          {/*<RadioButtonRN
            data={data}
            initial={2}
            selectedBtn={(e) => console.log(e)}
          />*/}
          <View
            style={{
              flexDirection: "row",
              margin: 0,
              padding: 0,
              alignItems: "flex-end",
              //justifyContent: "flex-end",
            }}
          >
            <CheckBox
              style={styles.checkBox}
              checkedIcon="dot-circle-o"
              uncheckedIcon="circle-o"
            ></CheckBox>
            <CheckBox
              style={styles.checkBox}
              checkedIcon="dot-circle-o"
              uncheckedIcon="circle-o"
            ></CheckBox>
            <CheckBox
              style={styles.checkBox}
              checkedIcon="dot-circle-o"
              uncheckedIcon="circle-o"
            ></CheckBox>
          </View>
          <View>
            <TextInput
              placeholder="Temporary Filler"
              numberOfLines={4}
              maxLength={100} // max number of chars
              style={{ backgroundColor: "white", marginTop: 30, padding: 5 }}
            />
          </View>
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
