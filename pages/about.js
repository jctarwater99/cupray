import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Image, TouchableOpacity, Dimensions, FlatList } from "react-native";
import { StyleSheet, Button, Text, View } from "react-native";
import { populateDB } from "../database/populate";
import { createDatabase, dropForTesting } from "../database/create";
import * as queries from "../database/query";

var { height, width } = Dimensions.get("window");


const About = ({ navigation }) => {
    return ( 
        <View style={styles.container}>
            <Text style={[{ textAlign: 'center'}]}>Team Oreo</Text>
        </View>
    ) };

    const styles = StyleSheet.create({
        container: {
            
            marginTop: height * 0.2,
            textAlign: "center",
          },

    });
    export default About;