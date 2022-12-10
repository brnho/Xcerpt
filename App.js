import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import Books from "./components/Books.js";
import Books2 from "./components/Books2.js";
import Excerpts from "./components/Excerpts.js";
import { useFonts } from 'expo-font';
import ExcerptDetail from "./components/ExcerptDetail.js";
import BookSearch from "./components/BookSearch.js";

const Stack = createStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    Quicksand: require('./assets/Fonts/Quicksand-Regular.ttf'),
    QuicksandBold: require('./assets/Fonts/Quicksand-Bold.ttf'),
    LibreBaskerville: require('./assets/Fonts/LibreBaskerville-Regular.ttf'),
    LibreBaskervilleBold: require('./assets/Fonts/LibreBaskerville-Bold.ttf'),
    DMSerif: require('./assets/Fonts/DMSerifText-Regular.ttf')
  });

  if (!fontsLoaded) {
    return null;
  }

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

