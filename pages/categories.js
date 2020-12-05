import React, { useEffect, useState } from "react";
import {
  Image,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  TextInput,
  FlatList,
  Button,
  Text,
  View,
} from "react-native";
import * as queries from "../database/query";
import * as inserts from "../database/insert";
import * as updates from "../database/update";
import { Category } from "../database/objects";
import Modal from 'react-native-modal';

var { height, width } = Dimensions.get("window");

const CategoriesScreen = ({ navigation }) => {

  let [categories, setCategories] = useState([]);
  let [newCategory, setNewCategory] = useState("e.g. My Pals")
  let [createPopupVisible, toggleCreatePopupVisibility] = useState(false);
  let [editPopupVisible, toggleEditPopupVisibility] = useState(false);
  let [selectedCatName, setSelectedCatName] = useState("None");
  let [selectedCatID, setSelectedCatID] = useState(-1);


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
        onPress={() =>
          navigation.navigate("Requests", {
            cat_id: category.tagID,
            cat_name: category.name,
          })
        }
        onLongPress={()=>{
          setSelectedCatName(category.name);
          setSelectedCatID(category.tagID);
          toggleEditPopupVisibility(!editPopupVisible);
        }}
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
      <Text style={styles.title}>
        Categories<Text style={styles.titleAccent}>.</Text>
      </Text>

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
          onPress={() => { 
            setNewCategory("e.g. My Pals");
            toggleCreatePopupVisibility(!createPopupVisible);
          }} // goto create category page or popup or something
          style={styles.createCategoryButton}
        >
          <Text style={styles.plusSign}>+</Text>
        </TouchableOpacity>
        <Text style={[styles.plusSign, {marginTop: height * 0.01}]}> Add Category </Text>

        <Modal 
        isVisible={createPopupVisible}
        backdropOpacity={0.25}
        animationInTiming={400}
        animationOutTiming={800}
        >
          <View style={styles.popUpContainer}>
            <Text style={styles.popUpHeader}>Create New Category</Text>
            <TextInput
                  numberOfLines={4}
                  maxLength={10} // max number of chars
                  multiline={true}
                  value={newCategory}
                  onChange={(text) => setNewCategory(text.nativeEvent.text)}
                  style={{
                    backgroundColor: "white",
                    color: "#7E8C96",
                    padding: 5,
                    textAlignVertical: "top",
                    fontWeight: "600",
                  }}
                />
            <Text style={styles.popUpHeader}>Add Reminders</Text>

            <TouchableOpacity 
            style={{marginLeft: width * 0.6}}
            onPress={() => { 
              toggleCreatePopupVisibility(!createPopupVisible); 
              let cat = new Category();
              cat.name = newCategory;
              cat.tagID = -1; // filler value

              cat.remind_freq = 0; // Set later
              cat.remind_days = "MXWXFXX"; // Set later
              cat.remind_time = "T10:43:17+0000"; // Set later

              inserts.insertNewTag(newCategory, cat); // New category is the tag name
              
              setTimeout(() => { 
                queries.getCategories((results) => {
                  setCategories(results);
                });
              }, 100);
            }}>
              <Text style={styles.plusSign}>Save</Text>
              </TouchableOpacity>
            </View>
        </Modal>

        <Modal 
        isVisible={editPopupVisible}
        backdropOpacity={0.25}
        animationInTiming={400}
        animationOutTiming={800}
        >
          <View style={styles.popUpContainer}>
            <Text style={styles.popUpHeader}>Edit Category</Text>
            <TextInput
                  numberOfLines={4}
                  maxLength={10} // max number of chars
                  multiline={true}
                  value={selectedCatName}
                  onChange={(text) => setNewCategory(text.nativeEvent.text)}
                  style={{
                    backgroundColor: "white",
                    color: "#7E8C96",
                    padding: 5,
                    textAlignVertical: "top",
                    fontWeight: "600",
                    marginBottom: height * 0.01,
                  }}
                />
            <View>
            <Text style={styles.popUpHeader}>Edit Reminders</Text>
            <Text style={styles.plusSign}>Date stuff</Text>
            </View>

            <View style={{flexDirection: 'row', position: 'absolute', bottom: height * 0.03}}>
            <TouchableOpacity 
           style={{width: width * 0.6}}
           onPress={() =>{
            // Provide warning
            alert('Deleting this Category will delete all the requests associated with it as well! Are you sure?');
            // exit if necessary
            updates.deleteRequestTagsInCategory(selectedCatID);
            // Delete category
            // Delete tag
            toggleEditPopupVisibility(!editPopupVisible)
           }}
           >
            <Text style={styles.plusSign}>Delete</Text>

            </TouchableOpacity>

            <TouchableOpacity 
            style={{width: width * 0.58}}
            onPress={() => { 
              toggleEditPopupVisibility(!editPopupVisible); 
              
              setTimeout(() => { 
                queries.getCategories((results) => {
                  setCategories(results);
                });
              }, 100);
            }}>
              <Text style={styles.plusSign}>Save</Text>
              </TouchableOpacity>
              </View>
            </View>
        </Modal>
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
    marginTop: height * 0.08,
  },

  folderContainer: {
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
  },

  folderTitles: {
    flex: 0,
    fontSize: 16,
    color: "#003a63",
    fontWeight: "700",
    flexDirection: "column",
    padding: height * 0.02,
    marginLeft: width * 0.06,
  },

  popUpContainer: {
    width: 327,
    height: 200,
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
    backgroundColor: "#D6C396",
    alignItems: "center",
  },

  popUpHeader: {
    flex: 0,
    fontSize: 16,
    color: "#fff",
    fontWeight: "700",
    padding: height * 0.01,
  },

  lineStyle: {
    borderWidth: 1,
    borderColor: "#D3D3D3",
    margin: 40,
    marginBottom: 0,
    marginTop: 0,
  },

  addCat: {
    alignItems: "center",
    margin: 20,
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
  title: {
    color: "#D6C396",
    fontSize: 46,
    fontWeight: "700",
    marginBottom: height * 0.02,
    marginRight: width * 0.2,
  },

  titleAccent: {
    color: "#003A63",
    fontSize: 46,
    fontWeight: "700",
  },
});

export default CategoriesScreen;
