import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import Excerpts from "./components/Excerpts/Excerpts.js";
import ExcerptDetail from "./components/Excerpts/ExcerptDetail.js";
import BookSearch from "./components/BookSearch.js";
import Books from "./components/Books.js";
import Settings from "./components/Settings.js";
import EditName from "./components/EditName.js";
import EditUsername from "./components/EditUsername.js";
import Friends from "./components/Friends.js";
import SearchFriends from "./components/SearchFriends.js";

const Stack = createStackNavigator();

export default function AppStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Back' component={Books} options={{ headerShown: false }} />
        <Stack.Screen name='Excerpts' component={Excerpts} options={{ headerShown: false }} />
        <Stack.Screen name='ExcerptDetail' component={ExcerptDetail} />
        <Stack.Screen name='BookSearch' component={BookSearch} />
        <Stack.Screen name='Settings' component={Settings} options={{ headerShown: false }} />
        <Stack.Screen name='EditName' component={EditName} options={{ headerShown: false }} />
        <Stack.Screen name='EditUsername' component={EditUsername} options={{ headerShown: false }} />
        <Stack.Screen name='Friends' component={Friends} options={{ headerShown: true }} />
        <Stack.Screen name='SearchFriends' component={SearchFriends} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

