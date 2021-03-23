import React from "react";
import { Image, TouchableOpacity, Dimensions, Linking } from "react-native";
import { StyleSheet, Text, View } from "react-native";

var { height, width } = Dimensions.get("window");

const About = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", marginRight: width * 0.02 }}>
        <TouchableOpacity onPress={() => navigation.navigate("Dash")}>
          <Image
            style={{
              marginLeft: width * 0.06,
              marginTop: height * 0.015,
              width: 30,
              height: 30,
              resizeMode: "contain",
            }}
            source={require("../assets/Home_blue.png")}
          ></Image>
        </TouchableOpacity>
      </View>
      <View style={{ marginTop: height * 0.2 }}>
        <Text style={styles.title}>
          This is app is brought to you by the{" "}
          <Text style={styles.titleAccent}>GO Pray Team </Text>
          at Cedarville University
        </Text>
        <Text style={styles.subtitle}>
          Please send feedback to this{" "}
          <Text
            style={styles.subtitleAccent}
            onPress={() =>
              Linking.openURL("https://forms.gle/ZVkDG3Aw9aFZ7D656")
            }
          >
            Google Form
          </Text>
        </Text>
        <Text style={styles.subtitle}>Thank You :)</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EFEFEF",
    alignItems: "flex-start",
    marginTop: height * 0.06,
  },

  title: {
    color: "#003A63",
    fontSize: 25,
    fontWeight: "700",
    marginTop: height * 0.01,
    textAlign: "center",
    marginRight: width * 0.2,
    marginLeft: width * 0.2,
  },

  titleAccent: {
    color: "#7E8C96",
    fontSize: 25,
    fontWeight: "700",
  },

  subtitle: {
    color: "#003A63",
    fontSize: 25,
    fontWeight: "700",
    marginTop: height * 0.04,
    textAlign: "center",
    marginRight: width * 0.2,
    marginLeft: width * 0.2,
  },
  subtitleAccent: {
    color: "#7E8C96",
    fontSize: 25,
    fontWeight: "700",
  },
});

export default About;
