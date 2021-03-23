import React, { useEffect, useState } from "react";
import {
  Image,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  TextInput,
  FlatList,
  Platform,
  Alert,
  Text,
  View,
  Keyboard,
} from "react-native";
import * as queries from "../database/query";
import * as inserts from "../database/insert";
import * as updates from "../database/update";
import { Category } from "../database/objects";
import Modal from "react-native-modal";
import DateTimePicker from "@react-native-community/datetimepicker";
import { checkBooks } from "../database/bookKeeping";
import * as scheduler from "../schedule/scheduler";

var { height, width } = Dimensions.get("window");

const CategoriesScreen = ({ navigation }) => {
  let [timePickerVisible, setTimePickerVisibility] = useState(false);
  let [categories, setCategories] = useState([]);
  let [newCategory, setNewCategory] = useState("");
  let [createPopupVisible, toggleCreatePopupVisibility] = useState(false);
  let [editPopupVisible, toggleEditPopupVisibility] = useState(false);
  let [selectedCatName, setSelectedCatName] = useState("None");
  let [selectedCategory, setSelectedCategory] = useState();
  let [selectedTime, setSelectedTime] = useState(new Date());
  let [displayTime, setDisplayTime] = useState("3:00 PM");
  let [days, setDays] = useState([
    false,
    true,
    false,
    true,
    false,
    true,
    false,
  ]);
  const shouldSetResponse = () => true;
  const onRelease = () => Keyboard.dismiss();

  useEffect(() => {
    queries.getCategories((results) => {
      setCategories(results);
    });
    if (Platform.OS == "ios") {
      setTimePickerVisibility(true);
    }
    checkBooks();
  }, []);

  let handleDayPress = (number) => {
    let newDays = [...days]; // can't change days manually, must create deep copy
    newDays[number] = !newDays[number];
    setDays(newDays);
  };

  let dayOfTheWeek = (letter, number) => {
    return (
      <TouchableOpacity
        style={[
          styles.dayOfTheWeek,
          days[number] ? styles.active : styles.inactive,
        ]}
        onPress={() => {
          handleDayPress(number);
        }}
      >
        <Text style={days[number] ? styles.activeText : styles.inactiveText}>
          {letter}
        </Text>
      </TouchableOpacity>
    );
  };

  let timePickerButton = Platform.select({
    ios: () => {
      return (
        <TouchableOpacity
          onPress={() => {
            setTimePickerVisibility(true);
          }}
          style={{ width: 250 }}
        ></TouchableOpacity>
      );
    },
    android: () => {
      return (
        <TouchableOpacity
          onPress={() => {
            setTimePickerVisibility(true);
          }}
          style={[styles.androidTimeButton, { marginBottom: height * 0.06 }]}
        >
          <Text style={styles.androidTimeHeader}>{displayTime}</Text>
        </TouchableOpacity>
      );
    },
  })();
  let timePicker = Platform.select({
    ios: () => {
      if (timePickerVisible) {
        return (
          <DateTimePicker
            value={selectedTime} // this value needs to be read from database
            mode={"time"}
            display="spinner"
            onChange={(event, date) => {
              handleChangeTime(event, date);
            }}
          />
        );
      }
    },
    android: () => {
      if (timePickerVisible) {
        return (
          <DateTimePicker
            value={selectedTime}
            mode={"time"}
            is24Hour={false}
            display="default"
            onChange={(event, date) => {
              handleChangeTime(event, date);
            }}
          />
        );
      }
    },
  })();

  const handleChangeTime = (event, selectedDate) => {
    const newDate = selectedDate || selectedTime;
    setTimePickerVisibility(Platform.OS === "ios"); // This is pretty creative, I like it :)
    setSelectedTime(newDate);
    parseTime(newDate, setDisplayTime);
  };

  let parseTime = (date, callback) => {
    let parsedTime = "";
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = " PM";
    let colon = ":";
    if (hours > 12) {
      hours -= 12;
    } else if (hours < 12) {
      ampm = " AM";
      if (hours == 0) {
        hours = 12;
      }
    }
    if (minutes < 10) {
      colon += "0";
    }
    parsedTime = hours.toString() + colon + minutes.toString() + ampm;
    callback(parsedTime);
  };

  let listItemView = (category) => {
    return (
      <View key={category.tagID} style={{ flexDirection: "row" }}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Requests", {
              cat_id: category.tagID,
              cat_name: category.name,
            })
          }
          onLongPress={() => {
            let date = new Date(category.remind_time);
            setSelectedCategory(category);
            setSelectedCatName(category.name);
            setSelectedTime(date);
            let newDays = [0, 0, 0, 0, 0, 0, 0];
            let i = 0;
            for (const day of category.remind_days) {
              newDays[i] = day == 1;
              i++;
            }
            setDays(newDays);

            parseTime(date, setDisplayTime);

            toggleEditPopupVisibility(!editPopupVisible);
          }}
        >
          <Text style={styles.folderTitles}> {category.name} </Text>
        </TouchableOpacity>
        <View style={{ flex: 1 }}></View>
        <TouchableOpacity style={{ marginLeft: width * 0.1 }}>
          <Text
            style={styles.catMenu}
            onPress={() => {
              let date = new Date(category.remind_time);
              setSelectedCategory(category);
              setSelectedCatName(category.name);
              setSelectedTime(date);
              let newDays = [0, 0, 0, 0, 0, 0, 0];
              let i = 0;
              for (const day of category.remind_days) {
                newDays[i] = day == 1;
                i++;
              }
              setDays(newDays);

              parseTime(date, setDisplayTime);

              toggleEditPopupVisibility(!editPopupVisible);
            }}
          >
            {" ⋮ "}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };
  let listViewItemSeparator = () => {
    return <View style={styles.lineStyle} />;
  };

  let refreshPage = () => {
    queries.getCategories((results) => {
      setCategories(results);
    });
    scheduler.rescheduleNotifs();
  };

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity onPress={() => navigation.navigate("Dash")}>
          <Image
            style={{
              marginRight: width * 0.03,
              marginTop: height * 0.015,
              width: 30,
              height: 30,
              resizeMode: "contain",
            }}
            source={require("../assets/Home_blue.png")}
          ></Image>
        </TouchableOpacity>
        <Text style={styles.title}>
          Journal<Text style={styles.titleAccent}>.</Text>
        </Text>
      </View>
      <View style={styles.folderContainer}>
        <FlatList
          showsVerticalScrollIndicator={false}
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
        <Text style={[styles.plusSign, { marginTop: height * 0.01 }]}>
          Add Category
        </Text>

        <Modal
          isVisible={createPopupVisible}
          backdropOpacity={0.25}
          animationInTiming={100}
          animationOutTiming={100}
          style={styles.modalContent}
          onBackdropPress={() => {
            toggleCreatePopupVisibility(!createPopupVisible);
          }}
        >
          <View
            style={styles.popUpContainer}
            onResponderRelease={onRelease}
            onStartShouldSetResponder={shouldSetResponse}
          >
            <Text style={styles.popUpHeader}>Create New Category</Text>
            <TextInput
              maxLength={15} // max number of chars
              multiline={true}
              value={newCategory}
              onFocus={() => setNewCategory("")}
              onChange={(text) => setNewCategory(text.nativeEvent.text)}
              style={{
                backgroundColor: "white",
                color: "#7E8C96",
                padding: 8,
                textAlignVertical: "top",
                fontWeight: "600",
                alignSelf: "stretch",
                textAlign: "center",
                marginLeft: width * 0.1,
                marginRight: width * 0.1,
              }}
            />
            <Text style={styles.popUpHeader}> Set Days for Reminder</Text>
            <View style={styles.weekContainer}>
              {dayOfTheWeek("S", 0)}
              {dayOfTheWeek("M", 1)}
              {dayOfTheWeek("T", 2)}
              {dayOfTheWeek("W", 3)}
              {dayOfTheWeek("R", 4)}
              {dayOfTheWeek("F", 5)}
              {dayOfTheWeek("S", 6)}
            </View>

            <Text style={styles.popUpHeader}> Set Time for Reminder</Text>
            <View>
              {timePickerButton}
              {timePicker}
            </View>

            <TouchableOpacity
              style={{ marginLeft: width * 0.6 }}
              onPress={() => {
                toggleCreatePopupVisibility(!createPopupVisible);
                let cat = new Category();
                cat.name = newCategory;
                cat.tagID = -1; // filler value

                let daysString = "";
                days.forEach((day) => {
                  daysString += day == 1 ? 1 : 0;
                });
                cat.remind_days = daysString;

                cat.remind_time = selectedTime.toString();

                inserts.insertNewTag(newCategory, cat, refreshPage); // New category is the tag name, also inserts new category
              }}
            >
              <Text style={styles.plusSign}>Save</Text>
            </TouchableOpacity>
          </View>
        </Modal>

        <Modal
          isVisible={editPopupVisible}
          backdropOpacity={0.25}
          animationInTiming={100}
          animationOutTiming={100}
          style={styles.modalContent}
          onBackdropPress={() => {
            toggleEditPopupVisibility(!editPopupVisible);
          }}
        >
          <View
            style={styles.popUpContainer}
            onResponderRelease={onRelease}
            onStartShouldSetResponder={shouldSetResponse}
          >
            <Text style={styles.popUpHeader}>Edit Category</Text>
            <TextInput
              maxLength={15} // max number of chars
              multiline={true}
              value={selectedCatName}
              onChange={(text) => setSelectedCatName(text.nativeEvent.text)}
              style={{
                backgroundColor: "white",
                color: "#7E8C96",
                padding: 5,
                textAlignVertical: "top",
                fontWeight: "600",
                alignSelf: "stretch",
                textAlign: "center",
                marginLeft: width * 0.1,
                marginRight: width * 0.1,
              }}
            />

            <Text style={styles.popUpHeader}> Edit Days for Reminder</Text>
            <View style={styles.weekContainer}>
              {dayOfTheWeek("S", 0)}
              {dayOfTheWeek("M", 1)}
              {dayOfTheWeek("T", 2)}
              {dayOfTheWeek("W", 3)}
              {dayOfTheWeek("R", 4)}
              {dayOfTheWeek("F", 5)}
              {dayOfTheWeek("S", 6)}
            </View>

            <Text style={styles.popUpHeader}> Edit Time for Reminder</Text>
            <View>
              {timePickerButton}
              {timePicker}
            </View>

            <View
              style={{
                flexDirection: "row",
                position: "absolute",
                bottom: height * 0.03,
              }}
            >
              <TouchableOpacity
                style={{ width: width * 0.6 }}
                onPress={() => {
                  // Provide warning
                  Alert.alert(
                    "Warning",
                    "Deleting this Category will archive all the requests associated with it as well. Are you sure?",
                    [
                      {
                        text: "Delete",
                        onPress: () => {
                          updates.archiveRequestsInCategory(
                            selectedCategory.tagID
                          );
                          updates.deleteCategory(
                            selectedCategory.tagID,
                            refreshPage
                          );
                          updates.deleteTag(selectedCategory.tagID);
                          updates.deleteRequestTagsOfTag(
                            selectedCategory.tagID
                          );
                          toggleEditPopupVisibility(!editPopupVisible);
                        },
                      },
                      {
                        text: "Cancel",
                        style: "cancel",
                        onPress: () => {
                          toggleEditPopupVisibility(!editPopupVisible);
                        },
                      },
                    ]
                  );
                }}
              >
                <Text style={styles.plusSign}>Delete</Text>
              </TouchableOpacity>

              <TouchableOpacity
                // This is the save button for the edit page?
                style={{ width: width * 0.58 }}
                onPress={() => {
                  let cat = new Category();

                  cat.name = selectedCatName;
                  cat.tagID = selectedCategory.tagID;

                  let daysString = "";
                  days.forEach((day) => {
                    daysString += day == 1 ? 1 : 0;
                  });
                  cat.remind_days = daysString;

                  cat.remind_time = selectedTime.toString();
                  updates.editCategory(cat, refreshPage);
                  updates.editTag(selectedCatName, selectedCategory.tagID);
                  toggleEditPopupVisibility(!editPopupVisible);
                }}
              >
                <Text style={styles.plusSign}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </View> // Nested much? lol
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

  cont: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  btnNormal: {
    borderColor: "blue",
    borderWidth: 1,
    borderRadius: 10,
    height: 30,
    width: 100,
  },
  btnPress: {
    borderColor: "blue",
    borderWidth: 1,
    height: 30,
    width: 100,
  },

  folderContainer: {
    width: width * 0.85,
    maxHeight: height * 0.6,
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

  catMenu: {
    color: "#003a63",
    fontSize: 30,
    fontWeight: "700",
    marginTop: height * 0.02,
    marginRight: width * 0.08,
  },

  modalContent: {
    justifyContent: "center",
    alignItems: "center",
    margin: 0,
  },

  popUpContainer: {
    width: width * 0.85,
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
    alignItems: "center",
  },

  popUpHeader: {
    flex: 0,
    fontSize: 16,
    color: "#003A63",
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
    padding: 7,
  },

  plusSign: {
    color: "#003a63",
    fontSize: 15,
    fontWeight: "700",
    textAlign: "center",
  },
  title: {
    color: "#D6C396",
    fontSize: width * 0.12,
    fontWeight: "700",
    marginBottom: height * 0.01,
    marginRight: width * 0.3,
  },

  titleAccent: {
    color: "#003A63",
    fontSize: width * 0.12,
    fontWeight: "700",
  },

  androidTimeHeader: {
    flex: 0,
    fontSize: 16,
    color: "#E8E7E4",
    fontWeight: "700",
    padding: height * 0.008,
  },

  androidTimeButton: {
    borderRadius: 6,
    backgroundColor: "#D6C396",
    padding: 3,
  },
  weekContainer: {
    flexDirection: "row",
    justifyContent: "center",
    display: "flex",
    height: 50,
    alignItems: "center",
  },

  dayOfTheWeek: {
    margin: 3,
    height: width * 0.095,
    width: width * 0.095,
    borderRadius: width * 0.095,
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
    color: "#fff",
  },
  inactiveText: {
    color: "#003A63",
  },
});

export default CategoriesScreen;
