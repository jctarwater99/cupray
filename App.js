import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Request, Request_Tag, Tag, Reminder } from "./database/objects";
import { WelcomeScreen } from "./pages/welcome";
import { Dashboard } from "./pages/dashboard";
import { disableExpoCliLogging } from "expo/build/logs/Logs";

import { SafeAreaView } from "react-native-safe-area-context";

export default function App() {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{ headerShown: true }}
      >
        {<Stack.Screen name="Welcome" component={WelcomeScreen} />}
        {<Stack.Screen name="Dash" component={Dashboard} />}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
