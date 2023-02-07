import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import Excerpts from "./components/Excerpts/Excerpts.js";
import ExcerptDetail from "./components/Excerpts/ExcerptDetail.js";
import BookSearch from "./components/BookSearch.js";
import Books from "./components/Books.js";

const Stack = createStackNavigator();

export default function AppStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Back' component={Books} options={{ headerShown: false }} />
        <Stack.Screen name='Excerpts' component={Excerpts} options={{ headerShown: false }} />
        <Stack.Screen name='ExcerptDetail' component={ExcerptDetail} />
        <Stack.Screen name='BookSearch' component={BookSearch} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

