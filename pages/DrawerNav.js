import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { View, Image, SafeAreaView, Dimensions, StyleSheet, Text } from "react-native";
import * as React from 'react';
import Dashboard from "./dashboard";
import StackNavigator from "./StackNav";
import CategoriesScreen from "./categories";
import ScheduledPrayers from "./prayerTime";
import AllReqs from "./allrequests";
import AllTags from "./alltags";
import About from "./about";

var { height, width } = Dimensions.get("window");

function CustomDrawerContent(props) {
    return (
      
      <DrawerContentScrollView  {...props}>
        <SafeAreaView style={{marginTop: height * 0.05}}>
        <View style={{flex: 1 }}>
              <DrawerItemList {...props} />
        </View>
        </SafeAreaView>
        <View>
          <Image source={require("../assets/logo_menu.png")} style={{ marginLeft: width * 0.15, marginTop: height * 0.18,
          height: 150, width: 150, resizeMode: "contain" }} />
          <Text style={styles.cu}>
          CU<Text style={styles.cupray}>Pray.</Text>
        </Text>
        </View>
        </DrawerContentScrollView>
      
      );
    }

const Drawer = createDrawerNavigator();
export default function DrawerNavigator() {
return (
<Drawer.Navigator
initialRouteName="Dashboard"
drawerContent={props => <CustomDrawerContent {...props} />}
drawerStyle={{
    backgroundColor: '#EFEFEF',
    
  }}
  drawerContentOptions={{
    activeTintColor: '#EFEFEF',
    activeBackgroundColor: '#D6C396',
    inactiveTintColor:  "#003A63",
    labelStyle: { fontWeight: "700", marginLeft: 15 },
  }}
>

    <Drawer.Screen
    name="Dashboard"
    component={StackNavigator}
    />
    
    <Drawer.Screen
    name="Prayer Time"
    component={ScheduledPrayers}
        />
    <Drawer.Screen
    name="Prayer Journal"
    component={CategoriesScreen}
        />
    <Drawer.Screen
    name="All Requests"
    component={AllReqs}
        />
     <Drawer.Screen
    name="All Tags"
    component={AllTags}
        />
     <Drawer.Screen
    name="About"
    component={About}
        />
</Drawer.Navigator>
);

}
const styles = StyleSheet.create({
    cu: {
        color: "#003a63",
        width: 233,
        height: 82,
        fontSize: 59,
        fontWeight: "700",
        textAlign: "center",
        marginLeft: width * 0.05,
      },
    
      cupray: {
        width: 233,
        height: 82,
        color: "#d6c396",
        fontSize: 59,
        fontWeight: "700",
        textAlign: "center",
      },
    });