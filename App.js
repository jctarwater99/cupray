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
} from "./database/objects";
import WelcomeScreen from "./pages/welcome";
import Dashboard from "./pages/dashboard";
import TestPage from "./pages/testPage";
import { disableExpoCliLogging } from "expo/build/logs/Logs";
import { SafeAreaView } from "react-native-safe-area-context";
import CategoriesScreen from "./pages/categories";
import RequestsScreen from "./pages/requests";
import RefactorRequestScreen from "./pages/refactorRequest";
import ThisRequestScreen from "./pages/individualRequest";
import TempDash from "./pages/tempDash";
import ScheduledPrayers from "./pages/prayerTime";
import RootNav from "./pages/RootNav";

const Stack = createStackNavigator();

const App = () => {
  return (
    <RootNav />
  );
};

export default App;
