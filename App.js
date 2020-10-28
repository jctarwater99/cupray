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

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{ headerShown: true }}
      >
        {<Stack.Screen name="Welcome" component={WelcomeScreen} />}
        {<Stack.Screen name="Dash" component={Dashboard} />}
        {<Stack.Screen name="Cat" component={CategoriesScreen} />}
        {<Stack.Screen name="Requests" component={RequestsScreen} />}
        {<Stack.Screen name="Test" component={TestPage} />}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
