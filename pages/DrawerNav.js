import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import * as React from 'react';
import Dashboard from "./dashboard";
import StackNavigator from "./StackNav";
import CategoriesScreen from "./categories";
import ScheduledPrayers from "./prayerTime";
import AllReqs from "./allrequests";
import AllTags from "./alltags";
import About from "./about";

const Drawer = createDrawerNavigator();
export default function DrawerNavigator() {
return (
<Drawer.Navigator>
<Drawer.Screen
    name="Welcome"
    component={StackNavigator}
        />
    <Drawer.Screen
    name="Dashboard"
    component={Dashboard}/>
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
