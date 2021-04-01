import "react-native-gesture-handler";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import WelcomeScreen from "./welcome";
import Dashboard from "./dashboard";
import CategoriesScreen from "./categories";
import RequestsScreen from "./requests";
import ThisRequestScreen from "./individualRequest";
import TempDash from "./tempDash";
import ScheduledPrayers from "./prayerTime";
import Scanner from "./qrcodescanner";
import MultiScanner from "./multiScan.js";

const Stack = createStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Welcome"
      screenOptions={{ headerShown: false }}
    >
      {<Stack.Screen name="Welcome" component={WelcomeScreen} />}
      {<Stack.Screen name="Dash" component={Dashboard} />}
      {<Stack.Screen name="Cat" component={CategoriesScreen} />}
      {<Stack.Screen name="Requests" component={RequestsScreen} />}
      {<Stack.Screen name="TempDash" component={TempDash} />}
      {<Stack.Screen name="Pray" component={ScheduledPrayers} />}
      {<Stack.Screen name="Scan QR Code" component={Scanner} />}
      {<Stack.Screen name="MultiScanner" component={MultiScanner} />}
      {<Stack.Screen name="IndividualRequest" component={ThisRequestScreen} />}
    </Stack.Navigator>
  );
}
