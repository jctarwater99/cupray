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

var { height, width } = Dimensions.get("window");

const ScheduledPrayers = ({ route, navigation }) => {
    let [days, setDays] = useState([
        false,
        false,
        false,
        true,
        false,
        false,
        false,
      ]);
      let [requests, setRequests] = useState([]);
      
      useEffect(() => {
          
        queries.getRequestsInCategory(4, (results) =>
          setRequests(results)
        );
      }, []);

    let dayOfTheWeek = (letter, number) => {
        return (
            <View>
                <Text style={days[number] ? styles.activeText : styles.inactiveText}>
              {letter}
            </Text>
            <View style={[
                styles.dayOfTheWeek,
                days[number] ? styles.active : styles.inactive,
              ]} ></View>

            </View>
          
        );
      };

      let listItemView = (request) => {
        return (
          <TouchableOpacity
            key={request.id}
            style={styles.requestBar}
            // Navigate @ Request, need isNew??
          >
            <View style={styles.circle} />
            <View>
              <Text style={styles.requestDone}>{"✓"}</Text>
            </View>
            <Text style={styles.requestTitles}>{request.subject}</Text>
          </TouchableOpacity>
        );
      };

    return (
        <SafeAreaView style={styles.container}>
        <Text style={styles.title}>
          Pray<Text style={styles.titleAccent}>.</Text>
        </Text>

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
            renderItem={({ item }) => listItemView(item)}
          />
          </View>
        </SafeAreaView>
    );

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#EFEFEF",
        marginTop: height * 0.08,

      },
    
      title: {
        color: "#D6C396",
        fontSize: 46,
        fontWeight: "700",
        marginLeft: width * 0.08,
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
        marginTop: height * 0.03,
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
        alignSelf: 'center',
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
        padding: 12,
        alignSelf: 'center',
      },

      requestTitles: {
        color: "#003A63",
        fontSize: 15,
        fontWeight: "700",
        marginLeft: width * 0.05,
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