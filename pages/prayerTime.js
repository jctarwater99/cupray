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
import { populateDB } from "../database/populate";
import { createDatabase } from "../database/create";
import * as queries from "../database/query";
import * as updates from "../database/update";
import { Category } from "../database/objects";
import { CheckBox } from "react-native-elements";
import { checkBooks } from "../database/bookKeeping";

var { height, width } = Dimensions.get("window");

const ScheduledPrayers = ({ route, navigation }) => {
  let [requests, setRequests] = useState([]);
  let [requestStates, setRequestStates] = useState(false);
  let [days, setDays] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);

  useEffect(() => {
    // each request has a request.isPrayedFor boolean variable you can use to
    // decide whether or not to render the check mark
    queries.getDailyRequests((results) => {
      setRequests(results.slice(0, 5));
      var i;
      let reqStates = [];
      for (i = 0; i < 5 && i < results.length; i++) {
        reqStates.push(results[i].isPrayedFor == 1); // Super important that we don't change from 0/1 to true/false in the db now, RN expects bool
      }
      setRequestStates(reqStates);
    });
    setDayOfTheWeek();
    checkBooks();
  }, []);

  let setDayOfTheWeek = () => {
    let day = new Date().toString().substring(0, 3);
    let newDays = [false, false, false, false, false, false, false];
    if (day == "Sun") {
      newDays[0] = true;
    } else if (day == "Mon") {
      newDays[1] = true;
    } else if (day == "Tue") {
      newDays[2] = true;
    } else if (day == "Wed") {
      newDays[3] = true;
    } else if (day == "Thu") {
      newDays[4] = true;
    } else if (day == "Fri") {
      newDays[5] = true;
    } else {
      newDays[6] = true;
    }
    setDays(newDays);
  };

  let dayOfTheWeek = (letter, number) => {
    return (
      <View>
        <Text style={days[number] ? styles.activeText : styles.inactiveText}>
          {letter}
        </Text>
        <View
          style={[
            styles.dayOfTheWeek,
            days[number] ? styles.active : styles.inactive,
          ]}
        ></View>
      </View>
    );
  };

  let handleButtonPress = (index) => {
    let temp = [...requestStates];
    temp[index] = !temp[index];
    setRequestStates(temp);

    // Update value in database
    //
    //
  };

  let listItemView = (request, index) => {
    return (
      <TouchableOpacity
        key={request.id}
        style={[
          styles.requestBar,
          //requestStates[index] ? styleActive: styleInactive
        ]}
        // Navigate @ Request, need isNew??
      >
        <View>
          <CheckBox
            checkedIcon={
              <Image
                style={{ width: 20, height: 20 }}
                source={require("../assets/checked.png")}
              />
            }
            uncheckedIcon={
              <Image
                style={{ width: 20, height: 20 }}
                source={require("../assets/unchecked.png")}
              />
            }
            checked={requestStates[index]}
            onPress={() => handleButtonPress(index)}
          />
        </View>
        <Text style={styles.requestTitles}>{request.subject}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{ flex: 0.7, flexDirection: "row", marginLeft: width * 0.05 }}
      >
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
          Pray<Text style={styles.titleAccent}>.</Text>
        </Text>
      </View>
      <Text style={styles.header1}> Today's Schedule </Text>

      <View style={styles.dateContainer}>
        <View style={styles.weekContainer}>
          {dayOfTheWeek("S", 0)}
          {dayOfTheWeek("M", 1)}
          {dayOfTheWeek("T", 2)}
          {dayOfTheWeek("W", 3)}
          {dayOfTheWeek("R", 4)}
          {dayOfTheWeek("F", 5)}
          {dayOfTheWeek("S", 6)}
        </View>
      </View>
      <View>
        <Text style={styles.header2}> Daily: </Text>
        <FlatList
          data={requests}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => listItemView(item, index)}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EFEFEF",
    marginTop: height * 0.06,
  },

  title: {
    color: "#D6C396",
    fontSize: 46,
    fontWeight: "700",
    marginBottom: height * 0.01,
    marginRight: width * 0.1,
  },

  titleAccent: {
    color: "#003A63",
    fontSize: 46,
    fontWeight: "700",
  },

  header1: {
    width: 250,
    height: 28,
    color: "#003A63",
    fontSize: 20,
    fontWeight: "700",
    marginLeft: width * 0.06,
  },

  header2: {
    width: 250,
    color: "#d6c396",
    fontSize: 30,
    fontWeight: "700",
    marginTop: height * 0.02,
    marginLeft: width * 0.06,
  },

  dateContainer: {
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
    marginTop: height * 0.02,
    alignSelf: "center",
    padding: 25,
  },

  weekContainer: {
    flexDirection: "row",
    justifyContent: "center",
    display: "flex",
    height: 50,
    alignItems: "center",
  },

  dayOfTheWeek: {
    margin: 5,
    height: 35,
    width: 35,
    borderRadius: 35,
    alignItems: "center",
    justifyContent: "center",
  },
  active: {
    backgroundColor: "#D6C396",
  },
  inactive: {
    backgroundColor: "#D3D3D3",
  },
  activeText: {
    color: "#D6C396",
    fontSize: 19,
    marginLeft: width * 0.04,
    marginBottom: width * 0.005,
  },
  inactiveText: {
    color: "#003A63",
    fontSize: 19,
    marginLeft: width * 0.04,
    marginBottom: width * 0.005,
  },

  requestBar: {
    width: 327,
    flexDirection: "row",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.27,
    shadowRadius: 3.65,

    elevation: 6,
    borderRadius: 8,
    backgroundColor: "#E8E7E4",
    margin: height * 0.01,
    padding: 10,
    alignSelf: "center",
  },

  requestTitles: {
    color: "#003A63",
    fontSize: 15,
    fontWeight: "700",
    marginLeft: width * 0.05,
    marginTop: height * 0.012,
  },

  requestDone: {
    color: "#003A63",
    fontSize: 25,
    fontWeight: "700",
  },

  circle: {
    width: 16,
    height: 16,
    borderRadius: 100 / 2,
    borderWidth: 2,
    borderColor: "#003A63",

    marginLeft: width * 0.05,
  },
});

export default ScheduledPrayers;
