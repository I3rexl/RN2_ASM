import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, SafeAreaView } from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";

type ProductDetailProps = {
  avatar: string;
  name: string;
  price: number;
  origin: string;
  quantity: number;
};

const ProductDetailScreen = ({ navigation }: any) => {
  const route = useRoute<RouteProp<{ params: ProductDetailProps }, "params">>();
  const { avatar, name, price, origin, quantity } = route.params;

  const [count, setCount] = useState(0);

  const increase = () => setCount(prev => Math.min(prev + 1, quantity));
  const decrease = () => setCount(prev => Math.max(prev - 1, 0));

  const total = count * price;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.containerHeader}>

      <TouchableOpacity onPress={() => navigation.navigate("Home")}>
        <Image source={require('../images/ic_back.png')} />
      </TouchableOpacity>

      <Text style={styles.title}>{name}</Text>
      
      <TouchableOpacity onPress={() => navigation.navigate("Cart")}>
        <Image source={require('../images/shopping-cart.png')} />
      </TouchableOpacity>
      </View>

      <View style={styles.containerImg}>
        <Image source={require('../images/ic_pev.png')} style={styles.imgPev}/>

        <Image source={{ uri: avatar }} style={styles.image} />

        <Image source={require('../images/ic_next.png')} style={styles.imgNext}/>
      </View>

      <View style={styles.containerGT}>
      <Text style={styles.textGT1}>Cây trồng</Text>
      <Text style={styles.textGT2}>Ưa sáng</Text>
      </View>


      <Text style={styles.price}>{!isNaN(price) ? `${price.toLocaleString()}đ` : "0đ"}</Text>

      <Text style={styles.textGT3}>Chi tiết sản phẩm</Text>
      <View style={styles.line}></View>

      <View style={styles.infoContainer}>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Kích cỡ</Text>
          <Text style={styles.infoValue}>Nhỏ</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Xuất xứ</Text>
          <Text style={styles.infoValue}>{origin}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Tình trạng</Text>
          <Text style={[styles.infoValue, { color: "#007537" }]}>Còn {quantity} sp</Text>
        </View>
    </View>

      <Text style={styles.countSP}>Đã chọn {count} sản phẩm</Text>

      <View style={styles.counterRow}>
        <TouchableOpacity onPress={decrease} style={styles.counterButton}><Text>-</Text></TouchableOpacity>
        <Text style={styles.countText}>{count}</Text>
        <TouchableOpacity onPress={increase} style={styles.counterButton}><Text>+</Text></TouchableOpacity>
        <Text style={styles.tempTotal}>{!isNaN(total) ? `${total.toLocaleString()}đ` : "0đ"}</Text>
      </View>

      <TouchableOpacity
        style={[styles.buyButton, { backgroundColor: count > 0 ? "#007537" : "#ccc" }]}
        onPress={() => {
          if (count > 0) {
            navigation.navigate("Cart", {
              product: {
                avatar,
                name,
                price,
                origin,
                quantity,
                count,
                total: total,
              }
            });
          }
        }}
      >
        <Text style={styles.buyText}>CHỌN MUA</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: "#fff", flex: 1 },
  image: { width: "100%", height: 350, resizeMode: "contain", marginTop: 20, },
  title: { fontSize: 19, fontWeight: "500", textAlign: "center"},
  price: { fontSize: 22, fontWeight: "bold", color: "#007537", marginTop: 20, },
  infoContainer: { marginTop: 3 },
  infoLabel: { fontWeight: "500", marginTop: 10, fontSize: 16},
  infoValue: { marginTop: 2 , fontSize: 15},
  counterRow: { flexDirection: "row", alignItems: "center", marginTop: 20, justifyContent: "space-between", gap: 8 },
  counterButton: { width: 48, height: 48, borderWidth: 1, borderRadius: 4, alignItems: "center", justifyContent: "center" },
  countText: { marginHorizontal: 10, fontSize: 16 },
  tempTotal: { fontWeight: "bold", fontSize: 16 },
  buyButton: { padding: 16, alignItems: "center", borderRadius: 12, marginTop: 24 },
  buyText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  badge: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    backgroundColor: "#007537",
    borderRadius: 6,
    marginRight: 8,
  },
  badgeText: {
    color: "#fff",
    fontSize: 14,
  },
  containerHeader:{
    flexDirection: "row",
    justifyContent: "space-between"
  },
  containerImg:{
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F6F6F6",
    marginTop: 20,
    width: 450,
    right: 20,
  },
  imgPev:{
    left: 50,
  },
  imgNext:{
    right: 50,
  },
  containerGT:{
    flexDirection: "row",
  },
  textGT1:{
    backgroundColor: "#007537",
    marginTop: 20,
    padding: 8,
    color: "white",
    borderRadius: 4,
    fontWeight: "400",
    fontSize: 15,
  },
  textGT2:{
    backgroundColor: "#007537",
    marginTop: 20,
    left: 15,
    padding: 8,
    color: "white",
    borderRadius: 4,
    fontWeight: "400",
    fontSize: 15,
  },
  textGT3:{
    marginTop: 20,
    fontWeight: "500",
    fontSize: 20,
    color: "#3A3A3A",
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingVertical: 5,
  },
  line: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: "#ccc",
    paddingVertical: 2,
  },
  countSP:{
    fontSize: 15,
    marginTop: 15,
  }
  
});

export default ProductDetailScreen;