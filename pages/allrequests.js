import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Image, TouchableOpacity, Dimensions, FlatList, TextInput } from "react-native";
import { StyleSheet, Button, Text, View } from "react-native";
import { populateDB } from "../database/populate";
import { createDatabase, dropForTesting } from "../database/create";
import * as queries from "../database/query";

var { height, width } = Dimensions.get("window");


const AllReqs = ({ navigation }) => {
    return ( 
        <View style={styles.container}>
          <FlatList 
          ListHeaderComponent={ 
            <View>
            <View style={{ flexDirection: "row", marginRight: width * 0.02}}>
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <Image
                style={{
                  marginRight: width * 0.05,
                  marginTop: height * 0.015,
                  width: 30,
                  height: 30,
                  resizeMode: 'contain'
                }}
                source={require("../assets/hamburger.png")}
              ></Image>
            </TouchableOpacity>
            <Text style={styles.title}>
              All Requests<Text style={styles.titleAccent}>.</Text>
            </Text>
            </View>
            <View style={{flexDirection: "row"}}>
            <TextInput
            autoCapitalize='none'
            autoCorrect={false}
            //onChangeText={handleSearch()}
            status='info'
            placeholder='Search'
            clearButtonMode='always'
            style={{
              borderRadius: 10,
              borderColor: '#333',
              backgroundColor: '#fff',
              padding: 10,
              width: '80%'
            }}
          textStyle={{ color: '#000' }}
            />
            <View style={{width: '3%'}} />
            <TouchableOpacity
            style={styles.searchButton}
            >
              <Text style={styles.searchButtonTxt}>Go</Text>
              </TouchableOpacity>
            </View>
            </View>
            }
            
        />
        </View>

    ) };


    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: "#EFEFEF",
            alignItems: "center",
            marginTop: height * 0.06,
            marginLeft: width * 0.04,
          },

          title: {
            color: "#D6C396",
            fontSize: 46,
            fontWeight: "700",
            marginBottom: height * 0.01,
          },
        
          titleAccent: {
            color: "#003A63",
            fontSize: 46,
            fontWeight: "700",
          },

          searchButton: {
            width: 50,
            borderRadius: 10,
            backgroundColor: "#D3D3D3",
            padding: 6,
          },

          searchButtonTxt: {
            color: "#7E8C96",
            fontSize: 19,
            fontWeight: "500",
            textAlign: "center",
          },

    });


    export default AllReqs;