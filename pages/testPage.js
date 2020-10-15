import React, { useEffect, useState } from "react";
import * as SQLite from "expo-sqlite";
import { StatusBar } from "expo-status-bar";
import { Image, TouchableOpacity, Dimensions, FlatList } from "react-native";
import { StyleSheet, Button, Text, View } from "react-native";
import * as queries from "../database/query";

const db = SQLite.openDatabase("db.cupray");

const TestPage = () => {
  const [count, setCount] = useState(0);
  let [categories, setCategories] = useState([]);

  useEffect(() => {
    queries.getCategories((results) => setCategories(results));
  }, []);

  return (
    <View>
      <Text>Example Text</Text>
      <Button
        title="Count Button"
        onPress={function () {
          setCount(count + 1);
        }}
      />
      <Text>Did I press the button {count} times?</Text>
      <Button
        title="Query Button"
        onPress={function () {
          console.log(categories);
        }}
      />
      <Text>Oi yeet </Text>
    </View>
  );
};

export default TestPage;
