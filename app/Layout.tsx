import React from "react";
import { SafeAreaView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./screens/Login";
import Register from "./screens/Register";
import Home from "./screens/Home";


const Stack = createStackNavigator();

export default function Layout() {
  return (
    
      <SafeAreaView style={{ flex: 1 }}>
        <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Home" component={Home} />

        </Stack.Navigator>
      </SafeAreaView>
  );
}