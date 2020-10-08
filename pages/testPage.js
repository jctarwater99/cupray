import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Image, TouchableOpacity, Dimensions, FlatList } from "react-native";
import { StyleSheet, Button, Text, View } from "react-native";
import * as queries from "../database/query";

export function TestPage({ navigation }) {
  const [count, setCount] = useState(0);
  const [categories, setCategories] = useState([]);

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
          temp = queries.getCategories();
          //setCategories();
          console.log(temp);
        }}
      />
      <Text>Oi {categories} Yeet</Text>
    </View>
  );
}
