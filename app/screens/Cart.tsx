import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity, SafeAreaView, Modal , Alert} from "react-native";
import { useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ic_check from "../images/ic_check.png";
import ic_uncheck from "../images/ic_uncheck.png";

const Cart= ({ navigation }: any) => {
    const route = useRoute<any>();
    const [product, setProduct] = useState<any>(null);
    const [quantity, setQuantity] = useState(1);
    const [isSelected, setIsSelected] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [showConfirmAll, setShowConfirmAll] = useState(false);

    useEffect(() => {
        const loadCart = async () => {
            const stored = await AsyncStorage.getItem("cartItem");
            if (stored) {
                const parsed = JSON.parse(stored);
                setProduct(parsed.product);
                setQuantity(parsed.quantity || 1);
            }
        };
        loadCart();

        if (route.params?.product) {
            const save = async () => {
                await AsyncStorage.setItem(
                    "cartItem",
                    JSON.stringify({
                        product: route.params.product,
                        quantity: route.params.product.count || 1,
                    })
                );
            };
            setProduct(route.params.product);
            setQuantity(route.params.product.count || 1);
            console.log("==> count nhận từ ProductDetail:", route.params.product.count);
            save();
        }
    }, [route.params]);

    const increase = () => setQuantity((prev) => prev + 1);
    const decrease = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
    const confirmRemove = async () => {
        await AsyncStorage.removeItem("cartItem");
        setProduct(null);
        setShowConfirm(false);
    };

    const total = product ? quantity * product.price : 0;

    return(
        <View style={styles.container}>
        <View style={styles.containerHeader}>
            <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                <Image source={require("../images/ic_back.png")}/>
            </TouchableOpacity>

            <Text style={styles.textGT}>GIỎ HÀNG</Text>

            <TouchableOpacity
              onPress={() => {
                if (product) {
                  setShowConfirmAll(true);
                } else {
                  Alert.alert("Không có sản phẩm nào để xoá");
                }
              }}
            >
                <Image source={require("../images/ic_trash.png")} />
            </TouchableOpacity>

        </View>

        {!product ? (
            <Text style={{ textAlign: "center", marginTop: 50 }}>Giỏ hàng của bạn hiện đang trống</Text>
        ) : (
            <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
                <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 20 }}>
                    <TouchableOpacity onPress={() => setIsSelected(!isSelected)}>
                        <Image
                            source={isSelected ? ic_check : ic_uncheck}
                            style={{ width: 24, height: 24 }}
                        />
                    </TouchableOpacity>
                    <Image source={{ uri: product.avatar }} style={{ width: 80, height: 80, borderRadius: 8, marginHorizontal: 10 }} />
                    <View style={{ flex: 1 }}>
                        <Text>{product.name} | Ưa sáng</Text>
                        <Text style={{ color: "#007537", fontWeight: "bold" }}>{product.price.toLocaleString()}đ</Text>
                        <View style={{ flexDirection: "row", alignItems: "center", marginTop: 10 }}>
                            <TouchableOpacity onPress={decrease}>
                                <Image source={require("../images/ic_tru.png")} />
                            </TouchableOpacity>
                            <Text style={{ marginHorizontal: 10 }}>{quantity}</Text>
                            <TouchableOpacity onPress={increase}>
                                <Image source={require("../images/ic_cong.png")} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setShowConfirm(true)}>
                                <Text style={{ marginLeft: 20, textDecorationLine: "underline" }}>Xoá</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                {isSelected && (
                    <View style={{ borderTopWidth: 1, paddingTop: 20 }}>
                        <Text style={{ textAlign: "right", color: "#777" }}>Tạm tính</Text>
                        <Text style={{ textAlign: "right", fontSize: 16, fontWeight: "bold", marginBottom: 12 }}>{total.toLocaleString()}đ</Text>
                        <TouchableOpacity style={{ backgroundColor: "#007537", padding: 14, borderRadius: 8 }}>
                            <Text style={{ color: "#fff", fontWeight: "bold", textAlign: "center" }}>Tiến hành thanh toán</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        )}
        
        <Modal
            animationType="fade"
            transparent={true}
            visible={showConfirm}
            onRequestClose={() => setShowConfirm(false)}
        >
            <View style={styles.modalContainer}>
                <View style={styles.dialogBox}>
                    <Text style={styles.dialogTitle}>Xác nhận xoá đơn hàng?</Text>
                    <Text style={styles.dialogDescription}>Thao tác này sẽ không thể khôi phục.</Text>

                    <TouchableOpacity onPress={confirmRemove} style={styles.confirmButton}>
                        <Text style={styles.confirmText}>Đồng ý</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => setShowConfirm(false)}>
                        <Text style={styles.cancelText}>Huỷ bỏ</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>

        <Modal
            animationType="fade"
            transparent={true}
            visible={showConfirmAll}
            onRequestClose={() => setShowConfirmAll(false)}
        >
            <View style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "rgba(0,0,0,0.3)"
            }}>
                <View style={{
                    backgroundColor: "white",
                    borderRadius: 10,
                    padding: 20,
                    width: "80%",
                    alignItems: "center"
                }}>
                    <Text style={{ fontWeight: "bold", fontSize: 16, marginBottom: 8 }}>Xác nhận xoá tất cả đơn hàng?</Text>
                    <Text style={{ color: "#777", marginBottom: 20 }}>Thao tác này sẽ không thể khôi phục.</Text>
                    <TouchableOpacity
                        onPress={async () => {
                            await AsyncStorage.removeItem("cartItem");
                            setProduct(null);
                            setShowConfirmAll(false);
                        }}
                        style={{
                            backgroundColor: "#007537",
                            paddingVertical: 12,
                            borderRadius: 6,
                            width: "100%",
                            marginBottom: 10
                        }}
                    >
                        <Text style={{ color: "#fff", fontWeight: "bold", textAlign: "center" }}>Đồng ý</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setShowConfirmAll(false)}>
                        <Text style={{ textDecorationLine: "underline" }}>Huỷ bỏ</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
        
        </View>
    )
}

const styles= StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: "#FFFFFF"
    },
    containerHeader:{
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10,
        width: 400,
        marginLeft: 25,
    },
    textGT1:{
        
    },
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.3)",
    },
    dialogBox: {
        backgroundColor: "white",
        borderRadius: 10,
        padding: 20,
        width: "80%",
        alignItems: "center",
    },
    dialogTitle: {
        fontWeight: "bold",
        fontSize: 16,
        marginBottom: 8,
        textAlign: "center",
    },
    dialogDescription: {
        color: "#777",
        marginBottom: 20,
        textAlign: "center",
    },
    confirmButton: {
        backgroundColor: "#2F7737",
        paddingVertical: 12,
        borderRadius: 6,
        width: "100%",
        marginBottom: 10,
    },
    confirmText: {
        color: "#fff",
        fontWeight: "bold",
        textAlign: "center",
    },
    cancelText: {
        textDecorationLine: "underline",
        color: "#000",
    },
    textGT:{
        fontWeight: "500",
        fontSize: 16,
    }
});

export default Cart;