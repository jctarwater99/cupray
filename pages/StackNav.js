import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {
    Request,
    Request_Tag,
    Tag,
    Reminder,
    Category,
  } from "../database/objects";
import WelcomeScreen from "./welcome";
import Dashboard from "./dashboard";
import TestPage from "./testPage";
import CategoriesScreen from "./categories";
import RequestsScreen from "./requests";
import RefactorRequestScreen from "./refactorRequest";
import ThisRequestScreen from "./individualRequest";
import TempDash from "./tempDash";
import ScheduledPrayers from "./prayerTime";

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
        {<Stack.Screen name="IndividualRequest" component={ThisRequestScreen}/>}
        {<Stack.Screen name="Test" component={TestPage} />}
      </Stack.Navigator>
  );
};