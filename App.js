import React, { useState } from "react";
import { useFonts } from 'expo-font';
import AppStack from "./AppStack.js";
import Login from "./components/Login.js";
import { supabase } from "./supabase.js";

export default function App() {
  const [fontsLoaded] = useFonts({
    Quicksand: require('./assets/Fonts/Quicksand-Regular.ttf'),
    QuicksandBold: require('./assets/Fonts/Quicksand-Bold.ttf'),
    LibreBaskerville: require('./assets/Fonts/LibreBaskerville-Regular.ttf'),
    LibreBaskervilleBold: require('./assets/Fonts/LibreBaskerville-Bold.ttf'),
    DMSerif: require('./assets/Fonts/DMSerifText-Regular.ttf')
  });
  const [loggedIn, setLoggedIn] = useState(null);

  // check if the user has an existing session
  const getSession = async () => {
    try {
      const { data } = await supabase.auth.getSession();
      if (data.session !== null) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
    } catch (err) {
      console.error(err);
    }
  }

  React.useEffect(() => {
    getSession();
  }, []);

  if (!fontsLoaded) {
    return null;
  }
  
  return (
    loggedIn ? <AppStack /> : <Login />
  );
}

