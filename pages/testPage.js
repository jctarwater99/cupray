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

  useEffect(()=>{
    db.transaction((tx) => {
      tx.executeSql('SELECT name, tagID from categories ORDER BY name',[],(tx, result) => {
          var temp = [];
          for(let i = 0; i < result.rows.length; ++i)
            temp.push(result.rows.item(i));
          setCategories(temp);
          console.log(temp)
        });
    });
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
          //queries.getCategories();
          //setCategories();
        }}
      />
      <Text>Oi yeet </Text>
    </View>
  );
}

export default TestPage;