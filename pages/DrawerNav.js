import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import {
  View,
  Image,
  SafeAreaView,
  Dimensions,
  StyleSheet,
  Text,
} from "react-native";
import { NavigationContainer } from '@react-navigation/native';

import * as React from "react";
import StackNavigator from "./StackNav";
import AllReqs from "./allrequests";
import AllTags from "./alltags";
import About from "./about";
import Scanner from "./qrcodescanner";

var { height, width } = Dimensions.get("window");

export default function Navigation() {
  return (
    <NavigationContainer>
      <DrawerNav />
    </NavigationContainer>
  );
}

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <SafeAreaView style={{ flex: 1, marginTop: height * 0.05 }}>
        <View style={{ flex: 0.8 }}>
          <DrawerItemList {...props} />
        </View>
        <View style={{ height: height * 0.05 }}></View>
      </SafeAreaView>
      <View
        style={{ flex: 0.2, alignItems: "center", justifyContent: "flex-end" }}
      >
        <Image
          source={require("../assets/logo_menu.png")}
          style={{
            height: width * 0.35,
            width: width * 0.35,
            resizeMode: "contain",
          }}
        />
        <Text style={styles.cu}>
          GO<Text style={styles.cupray}>Pray.</Text>
        </Text>
      </View>
    </DrawerContentScrollView>
  );
}

const Drawer = createDrawerNavigator();
function DrawerNav() {
  return (
    <Drawer.Navigator
      initialRouteName="Dashboard"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      drawerStyle={{
        backgroundColor: "#EFEFEF",
      }}
      drawerContentOptions={{
        activeTintColor: "#EFEFEF",
        activeBackgroundColor: "#D6C396",
        inactiveTintColor: "#003A63",
        labelStyle: { fontWeight: "700", marginLeft: 15 },
      }}
    >
      <Drawer.Screen name="Dashboard" component={StackNavigator} />
      <Drawer.Screen name="All Requests" component={AllReqs} />
      <Drawer.Screen name="All Tags" component={AllTags} />
      <Drawer.Screen name="Scan QR Code" component={Scanner} />
      <Drawer.Screen name="About" component={About} />
    </Drawer.Navigator>
  );
}
const styles = StyleSheet.create({
  cu: {
    color: "#003a63",
    fontSize: width * 0.15,
    fontWeight: "700",
    textAlign: "center",
    marginRight: width * 0.02,
  },

  cupray: {
    color: "#d6c396",
    fontSize: width * 0.15,
    fontWeight: "700",
    textAlign: "center",
  },
});
