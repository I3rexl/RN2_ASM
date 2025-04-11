import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import useFetch from "../hooks/useFetch";

const Search = ({ navigation }: any) => {
    const [searchText, setSearchText] = useState("");
    const [recentSearches, setRecentSearches] = useState(["Spider Plant", "Song of India"]);

    const { data: plantList } = useFetch("http://192.168.0.17:3000/plant");

    const filteredData = searchText
        ? plantList.filter((item: any) =>
              item.name_plant.toLowerCase().includes(searchText.toLowerCase())
          )
        : [];

    const renderItem = ({ item }: any) => (
        <TouchableOpacity
            style={styles.card}
            onPress={() => {
                navigation.navigate("ProductDetail", {
                    avatar: item.avatar,
                    name: item.name_plant,
                    price: item.price,
                    origin: item.origin,
                    quantity: item.quantity
                });

                if (!recentSearches.includes(item.name_plant)) {
                    setRecentSearches([item.name_plant, ...recentSearches]);
                }
            }}
        >
            <Image source={{ uri: item.avatar }} style={styles.cardImage} />
            <View style={styles.cardInfo}>
                <Text style={styles.cardTitle}>{item.name_plant} | {item.type || "Hybrid"}</Text>
                <Text style={styles.cardPrice}>
                    {Number(item.price).toLocaleString()}đ
                </Text>
                <Text style={styles.cardStock}>Còn {item.quantity || 0} sp</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View style={styles.containerHeader}>
                <TouchableOpacity onPress={() => navigation.navigate("Home")} style={styles.btnBack}>
                    <Image source={require("../images/ic_back.png")} />
                </TouchableOpacity>
                <Text style={styles.textHeader}>TÌM KIẾM</Text>
            </View>
            <View style={styles.searchSection}>
                <TextInput
                    placeholder="Tìm kiếm"
                    value={searchText}
                    onChangeText={(text) => {
                        setSearchText(text);
                        if (text.trim() !== "" && !recentSearches.includes(text)) {
                            setRecentSearches([text, ...recentSearches]);
                        }
                    }}
                    style={styles.input}
                />
                <Ionicons name="search" size={20} color="#000" />
            </View>

            {searchText ? (
                <FlatList
                    data={filteredData}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderItem}
                    contentContainerStyle={styles.resultsContainer}
                />
            ) : (
                <>
                    <Text style={styles.recentTitle}>Tìm kiếm gần đây</Text>
                    {recentSearches.map((item, index) => (
                        <View key={index} style={styles.recentItem}>
                            <Ionicons name="time-outline" size={18} color="#777" style={styles.recentIcon} />
                            <Text style={styles.recentText}>{item}</Text>
                            <TouchableOpacity onPress={() => {
                                const newList = [...recentSearches];
                                newList.splice(index, 1);
                                setRecentSearches(newList);
                            }}>
                                <Ionicons name="close" size={18} color="black" />
                            </TouchableOpacity>
                        </View>
                    ))}
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF"
    },
    textHeader: {
        fontSize: 16,
        fontWeight: "500",
        left: 160,
    },
    containerHeader: {
        flexDirection: "row",
        marginTop: 10,
    },
    btnBack: {
        left: 20,
    },
    searchSection: {
        flexDirection: "row",
        alignItems: "center",
        borderBottomWidth: 1,
        borderColor: "#000",
        paddingHorizontal: 16,
        marginTop: 16,
        width: 350,
        left: 50,
    },
    input: {
        flex: 1,
        height: 40,
        fontSize: 16,
        color: "#000",
    },
    recentTitle: {
        marginTop: 24,
        marginHorizontal: 16,
        marginBottom: 15,
        fontSize: 16,
        fontWeight: "500",
        left: 35,
    },
    recentItem: {
        flexDirection: "row",
        alignItems: "center",
        marginHorizontal: 16,
        paddingVertical: 10,
        left: 35,
        width: 335,
    },
    recentIcon: {
        marginRight: 8,
    },
    recentText: {
        flex: 1,
        fontSize: 16,
    },
    resultsContainer: {
        paddingHorizontal: 16,
        marginTop: 16,
    },
    card: {
        flexDirection: "row",
        marginBottom: 16,
        backgroundColor: "#fff",
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
        padding: 10,
    },
    cardImage: {
        width: 80,
        height: 80,
        borderRadius: 10,
        marginRight: 10,
    },
    cardInfo: {
        flex: 1,
        justifyContent: "center",
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: "bold",
    },
    cardPrice: {
        fontSize: 15,
        marginTop: 4,
    },
    cardStock: {
        fontSize: 14,
        color: "green",
        marginTop: 2,
    },
});

export default Search;