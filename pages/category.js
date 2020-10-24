import React, { useEffect, useState } from "react";
import {
  Image,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  FlatList,
  Button,
  Text,
  View,
} from "react-native";
import * as queries from "../database/query";
import { Category } from "../database/objects";
import { preventAutoHide } from "expo/build/launch/SplashScreen";

var { height, width } = Dimensions.get("window");

const CategoryScreen = ({ navigation }) => {
  let [categories, setCategories] = useState([]);

  useEffect(() => {
    queries.getCategories((results) => {
      setCategories(results);
    });
  }, []);

  let listItemView = (category) => {
    return (
      <Text
        key={category.tagID}
        style={styles.folderTitles}
        onPress={() => navigation.navigate("Request", { id: category.tagID })}
      >
        {category.name}
      </Text>
    );
  };
  let listViewItemSeparator = () => {
    return <View style={styles.lineStyle} />;
  };

  return (
    <View style={styles.container}>
      <View style={styles.folderContainer}>
        <FlatList
          data={categories}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={listViewItemSeparator}
          renderItem={({ item }) => listItemView(item)}
        />
      </View>
      <View style={styles.addCat}>
        <TouchableOpacity
          onPress={() => void 0} // goto create category page or popup or something
          style={styles.createCategoryButton}
        >
          <Text style={styles.plusSign}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  // Overall container for screen
  container: {
    flex: 1,
    backgroundColor: "#EFEFEF",
    alignItems: "center",
    marginTop: height * 0.06,
  },

  folderContainer: {
    width: 337,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    padding: height * 0.02,
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
    borderRadius: 20,
    backgroundColor: "#E8E7E4",
  },

  folderTitles: {
    flex: 0,
    fontSize: 16,
    color: "#003a63",
    fontWeight: "700",
    flexDirection: "column",
    marginTop: height * 0.02,
    marginBottom: height * 0.02,
    marginLeft: width * 0.1,
  },

  lineStyle: {
    borderWidth: 1,
    borderColor: "#D3D3D3",
    margin: 40,
    marginBottom: 0,
    marginTop: 0,
  },

  addCat: {
    flex: 2,
    flexDirection: "column",
    justifyContent: "flex-end",
    margin: 60,
  },

  createCategoryButton: {
    width: 37,
    height: 36,
    borderRadius: 6,
    backgroundColor: "#D3D3D3",
    padding: 10,
  },

  plusSign: {
    color: "#003a63",
    fontSize: 15,
    fontWeight: "700",
    marginTop: height * -0.003,
    textAlign: "center",
  },
});

export default CategoryScreen;
