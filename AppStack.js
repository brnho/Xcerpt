import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import Books from "./components/Books.js";
import Books2 from "./components/Books2.js";
import Excerpts from "./components/Excerpts.js";
import ExcerptDetail from "./components/ExcerptDetail.js";
import BookSearch from "./components/BookSearch.js";

const Stack = createStackNavigator();

export default function AppStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Back' component={Books} options={{ headerShown: false }} />
        <Stack.Screen name='Excerpts' component={Excerpts} />
        <Stack.Screen name='ExcerptDetail' component={ExcerptDetail} />
        <Stack.Screen name='BookSearch' component={BookSearch} />
        <Stack.Screen name='NewUI' component={Books2} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

