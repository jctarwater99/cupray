import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Image, TouchableOpacity, Dimensions, FlatList } from "react-native";
import { StyleSheet, Button, Text, View } from "react-native";
import * as queries from "../database/query";

const TestPage = ({ route, navigation }) => {
  let [categories, setCategories] = useState([]);

  useEffect(() => {
    //queries.getTags((results) => setCategories(results));
    console.log(route.params.id);
    queries.getRequest(route.params.id, (results) => console.log(results));
  }, []);

  return (
    <View>
      <Text>Example Text</Text>
      <Button title="Query Button" />
      <Text>Oi yeet </Text>
    </View>
  );
};

export default TestPage;
