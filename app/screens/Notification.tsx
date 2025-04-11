import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity, SafeAreaView, Alert } from "react-native";

const Notification = ({ navigation }: any) => {
    return (
        <View style={styles.container}>
            <View style={styles.containerHeader}>
            <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                <Image source={require("../images/ic_back.png")}/>
            </TouchableOpacity>

            <Text style={styles.textGT}>THÔNG BÁO</Text>
            </View>

            <Text style={styles.textGT2}>Hiện chưa có thông báo nào cho bạn</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF"
    },
    containerHeader:{
        flexDirection: "row",
        marginTop: 10,
        width: 400,
        marginLeft: 25,
    },
    textGT:{
        left: 125,
        fontWeight: "500",
        fontSize: 16,
    },
    textGT2:{
        textAlign: "center",
        fontWeight: "400",
        fontSize: 14,
        marginTop: 50,
    }
});

export default Notification;