import useFetch from "../hooks/useFetch";
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity, SafeAreaView, Alert, FlatList, ScrollView } from "react-native";
import { useState, useEffect } from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Search from "./Search";
import Notification from "./Notification";
import Profile from "./Profile";
import axios from "axios";

const BottomTab= createBottomTabNavigator();

const Main = ({ navigation }: any) => {
    const { data: plantList, loading: loadingPlant } = useFetch("http://192.168.0.17:3000/plant");
    const { data: potList, loading: loadingPot } = useFetch("http://192.168.0.17:3000/pot");
    const {data: itemList, loading: loadingItem }= useFetch("http://192.168.0.17:3000/item");

    const renderItemPlant= ({ item }) => {
        return(
            <TouchableOpacity
                style={styles.card}
                onPress={() =>
                    navigation.navigate("ProductDetail", {
                    avatar: item.avatar,
                    name: item.name_plant,
                    price: Number(item.price),
                    origin: item.origin || "Châu Phi",
                    quantity: item.quantity || 156
                    })
                }
                >
                <Image source={{ uri: item.avatar }} style={styles.avatarItem} />
                <View style={styles.containerItem}>
                    <Text style={styles.name}>{item.name_plant}</Text>
                    <Text style={styles.detail}>{item.detail}</Text>
                    <Text style={styles.price}>
                        {`${Number(item.price).toLocaleString()}đ`}
                    </Text>
                </View>
            </TouchableOpacity>
            
        )
    }

    const renderItemPot= ({ item }) => {
        return(
            <View style={styles.card}>
                <Image source={{uri: item.avatar}} style={styles.avatarItem}/>
                <View style={styles.containerItem}>
                    <Text style={styles.name}>{item.name_pot}</Text>
                    <Text style={styles.price}>
                        {`${Number(item.price).toLocaleString()}đ`}
                    </Text>
                </View>
            </View>
            
        )
    }

    const renderItemItem= ({ item }) => {
        return(
            <View style={styles.card}>
                <Image source={{uri: item.avatar}} style={styles.avatarItem}/>
                <View style={styles.containerItem}>
                    <Text style={styles.name}>{item.name_item}</Text>
                    <Text style={styles.price}>
                        {`${Number(item.price).toLocaleString()}đ`}
                    </Text>
                </View>
            </View>
            
        )
    }

    return(
        <SafeAreaView style={{flex: 1, backgroundColor: "#F6F6F6"}}>
            <View style={styles.container}>
                <Image source={require("../images/background_Main.png")} style={styles.backgroundMain}/>

                <Text style={styles.textName}>Planta - tỏa sáng {"\n"}không gian nhà bạn</Text>

                <TouchableOpacity style={styles.shoppingIC} onPress={() => navigation.navigate("Cart")}>
                    <Image source={require("../images/shopping-cart.png")} />
                </TouchableOpacity>

                <TouchableOpacity>
                    <Text style={styles.textNew}>Xem hàng mới về</Text>
                    <Image source={require("../images/arrow-right.png")} style={styles.arrow}/>
                </TouchableOpacity>

                <ScrollView style={styles.containerList}>
                    <Text style={styles.textCategory}>Cây trồng</Text>
                    
                    <FlatList
                        data={plantList}
                        renderItem={renderItemPlant}
                        numColumns={2}
                        columnWrapperStyle={styles.row}
                        keyExtractor={(item, index) => item.id ? item.id.toString() : index.toString()}
                        style={styles.list}
                        />                    
                    
                    <TouchableOpacity style={styles.morePlnt}>
                        <Text style={styles.textmorePlnt}>Xem thêm cây trồng</Text>
                    </TouchableOpacity>

                    <Text style={styles.textCategory}>Chậu cây trồng</Text>

                    <FlatList
                        data={potList}
                        renderItem={renderItemPot}
                        numColumns={2}
                        columnWrapperStyle={styles.row}
                        keyExtractor={(item, index) => item.id ? item.id.toString() : index.toString()}
                        style={styles.list}
                        />

                    <TouchableOpacity style={styles.morePlnt}>
                        <Text style={styles.textmorePlnt}>Xem thêm chậu cây</Text>
                    </TouchableOpacity>

                    <Text style={styles.textCategory}>Phụ kiện</Text>

                    <FlatList
                        data={itemList}
                        renderItem={renderItemItem}
                        numColumns={2}
                        columnWrapperStyle={styles.row}
                        keyExtractor={(item, index) => item.id ? item.id.toString() : index.toString()}
                        style={styles.list}
                        />

                    <TouchableOpacity style={styles.morePlnt}>
                        <Text style={styles.textmorePlnt}>Xem thêm phụ kiện</Text>
                    </TouchableOpacity>

                    <Text style={styles.textCategory}>Combo chăm sóc {"("}mới{")"}</Text>   
                    
                    <Image source={require('../images/comboNew.png')} style={styles.imgCombo}/>
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

const Home= () => {
    return(
        <BottomTab.Navigator screenOptions={({ route }) => ({
            tabBarIcon: ({ focused }) => {
                let iconSource;

                if(route.name === "HomeTab"){
                    iconSource= require("../images/home.png");
                }
                else if(route.name === "SearchTab"){
                    iconSource= require("../images/search.png");
                }
                else if(route.name === "NotificationTab"){
                    iconSource= require("../images/bell.png");
                }
                else if(route.name === "ProfileTab"){
                    iconSource= require("../images/user.png");
                }

                return(
                    <View style={styles.iconContainer}>
                        <Image source={iconSource} style={styles.icon}/>
                        {focused && <Image source={require("../images/dot-active.png")} style={styles.dot} />}
                    </View>
                );
            },
            tabBarShowLabel: false,
            headerShown: false,
            tabBarStyle: {
                backgroundColor: "#FFFFFF",
                height: 70,
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                position: "absolute",
                borderTopWidth: 0,
                shadowOpacity: 0.1,
            },
        })}>
            <BottomTab.Screen name="HomeTab" component={Main} />
            <BottomTab.Screen name="SearchTab" component={Search} />
            <BottomTab.Screen name="NotificationTab" component={Notification} />
            <BottomTab.Screen name="ProfileTab" component={Profile} />
        </BottomTab.Navigator>
    )
}

const styles= StyleSheet.create({
    container:{
        flex: 1,
        alignItems: "center",
        backgroundColor: "#F6F6F6",
        top: 30,
    },
    backgroundMain:{
        width: 450,
        top: 70,
    },
    textName:{
        fontWeight: "500",
        fontSize: 24,
        bottom: 170,
        right: 80,
        lineHeight: 37,
    },
    shoppingIC:{
        width: 48,
        height: 48,
        borderRadius: 999999,
        backgroundColor: "#FFFFFF",
        bottom: 250,
        left: 170,
        alignItems: "center",
        justifyContent: "center",
    },
    textNew:{
        color: "#007537",
        fontWeight: "500",
        fontSize: 18,
        bottom: 210,
        right: 115,
    },
    arrow:{
        bottom: 232,
        left: 27,
    },
    containerList:{
        backgroundColor: "#FFFFFF",
        width: 450,
        height: 600,
        bottom: 100,
    },
    iconContainer: {
        alignItems: "center",
      },
      icon: {
        width: 25,
        height: 25,
        resizeMode: "contain",
        top: 10,
      },
      dot: {
        width: 6,
        height: 6,
        marginTop: 4,
        resizeMode: "contain",
        top: 10,
      },
      textCategory:{
        fontWeight: "500",
        fontSize: 24,
        margin: 20,
      },
      containerItem:{
        alignSelf: "flex-start",
        marginTop: 8,
        marginLeft: 10,
      },
      avatarItem:{
        width: "100%",
        height: 150,
        borderRadius: 10,
        resizeMode: "cover",
      },
      list: {
        flex: 1,
        marginHorizontal: 10,
      },
      row: {
        justifyContent: "space-between",
     },
     card: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        margin: 8,
        padding: 10,
        borderRadius: 12,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    name: {
        fontSize: 16,
        fontWeight: "500",
        color: "#000000",
    },
    detail: {
        top: 3,
        fontSize: 14,
        color: "#888",
    },
    price: {
        fontSize: 16,
        fontWeight: "500",
        color: "#007537",
        marginTop: 4,
    },
    morePlnt:{
        marginTop: 40,
        marginLeft: 40,
        marginRight: 40,
        alignItems: "flex-end",
    },
    textmorePlnt:{
        textDecorationLine: "underline",
        fontWeight: 500,
        fontSize: 16,
    },
    imgCombo:{
        width: 400,
        height: 160,
        margin: 20,
        bottom: 20,
        borderRadius: 8
    }
})

export default Home;