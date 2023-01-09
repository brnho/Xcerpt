import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import BooksOld from "./components/BooksOld.js";
import BooksSeeded from "./components/BooksSeeded.js";
import Excerpts from "./components/Excerpts.js";
import Excerpts2 from "./components/Excerpts2.js";
import ExcerptDetail from "./components/ExcerptDetail.js";
import BookSearch from "./components/BookSearch.js";
import Books from "./components/Books.js";

const Stack = createStackNavigator();

export default function AppStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Back' component={Books} options={{ headerShown: false }} />
        <Stack.Screen name='Excerpts' component={Excerpts} />
        <Stack.Screen name='Excerpts2' component={Excerpts2} />
        <Stack.Screen name='ExcerptDetail' component={ExcerptDetail} />
        <Stack.Screen name='BookSearch' component={BookSearch} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

