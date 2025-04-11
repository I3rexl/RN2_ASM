import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  Alert,
  SafeAreaView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Profile = ({ navigation }: any) => {
  const [userData, setUserData] = useState<{ name: string; email: string } | null>(null);

  useEffect(() => {
    const fetchUserByEmail = async () => {
      try {
        const email = await AsyncStorage.getItem("loggedInUserEmail");
        if (!email) {
          console.log("No user email found in storage.");
          return;
        }

        const res = await fetch("http://192.168.0.17:3000/user");
        const data = await res.json();
        const currentUser = data.find((u: any) => u.email === email);

        if (currentUser) {
          setUserData(currentUser);
          console.log("User name:", currentUser.name, "Email:", currentUser.email);
        } else {
          console.log("No user found with email:", email);
        }
      } catch (error) {
        console.error("Error fetching user by email:", error);
      }
    };

    fetchUserByEmail();
  }, []);

  const handleLogout = () => {
    Alert.alert("Đăng xuất", "Bạn có chắc muốn đăng xuất?", [
      { text: "Hủy", style: "cancel" },
      { text: "Đăng xuất", onPress: () => navigation.navigate("Login")},
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>HỒ SƠ</Text>
      <View style={styles.profileRow}>
        <Image
          source={require("../images/ic_avartar.png")}
          style={styles.avatar}
        />
        <View style={styles.profileInfo}>
          <Text style={styles.name}>{userData?.name || "..."}</Text>
          <Text style={styles.email}>{userData?.email || "..."}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Chung</Text>
        <View style={styles.separator} />
        <Text style={styles.option}>Chỉnh sửa thông tin</Text>
        <Text style={styles.option}>Cẩm nang trồng cây</Text>
        <Text style={styles.option}>Lịch sử giao dịch</Text>
        <TouchableOpacity onPress={() => navigation.navigate("QA")}>
          <Text style={styles.option}>Q &amp; A</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: "#999" }]}>
          Bảo mật và Điều khoản
        </Text>
        <View style={styles.separator} />
        <Text style={styles.option}>Điều khoản và điều kiện</Text>
        <Text style={styles.option}>Chính sách quyền riêng tư</Text>
      </View>

      <TouchableOpacity onPress={handleLogout}>
        <Text style={styles.logout}>Đăng xuất</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 24,
    
  },
  title: {
    fontSize: 16,
    fontWeight: "500",
    alignSelf: "center",
    marginBottom: 20,
    marginTop: 10,
  },
  profileRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#ccc",
    marginRight: 16,
  },
  profileInfo: {
    flexDirection: "column",
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
  },
  email: {
    fontSize: 14,
    color: "#888",
  },
  section: {
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 14,
    color: "#999",
  },
  separator: {
    height: 1,
    backgroundColor: "#ccc",
    marginVertical: 8,
  },
  option: {
    fontSize: 16,
    marginVertical: 8,
    fontWeight: "500"
  },
  logout: {
    color: "red",
    fontSize: 16,
    marginTop: 24,
  },
});

export default Profile;