import React from "react";
import { SafeAreaView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./screens/Login";
import Register from "./screens/Register";
import Home from "./screens/Home";
import ProductDetail from "./screens/ProductDetail";
import Search from "./screens/Search";
import Cart from "./screens/Cart";
import Notification from "./screens/Notification";
import QA from "./screens/QA";
import Profile from "./screens/Profile";


const Stack = createStackNavigator();

export default function Layout() {
  return (
    
      <SafeAreaView style={{ flex: 1 }}>
        <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="ProductDetail" component={ProductDetail} />
          <Stack.Screen name="Search" component={Search} />
          <Stack.Screen name="Cart" component={Cart} />
          <Stack.Screen name="Notification" component={Notification} />
          <Stack.Screen name="QA" component={QA} />
          <Stack.Screen name="Profile" component={Profile} />







        </Stack.Navigator>
      </SafeAreaView>
  );
}