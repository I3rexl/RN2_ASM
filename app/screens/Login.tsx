import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity, SafeAreaView, Alert } from "react-native";
import useFonts from "../useFont";
import { useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login({ navigation }: any) {

  const [email, setEmail]= useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage]= useState("");

  const [secureText, setSecureText] = useState(true); 
  const [rememberTK, setRememberTK]= useState(false);
  const [isFocusedTK, setIsFocusedTK] = useState(false);
  const [isFocusedMK, setIsFocusedMK] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const loadCredentials = async () => {
      try {
        const savedEmail = await AsyncStorage.getItem('savedEmail');
        const savedPassword = await AsyncStorage.getItem('savedPassword');
        const remember = await AsyncStorage.getItem('rememberTK');

        if (remember === 'true' && savedEmail && savedPassword) {
          setEmail(savedEmail);
          setPassword(savedPassword);
          setRememberTK(true);
        }
      } catch (error) {
        console.error('Lỗi khi tải thông tin đăng nhập:', error);
      }
    };

    loadCredentials();
  }, []);


  const validateLogin= async () =>{
    try {
      const response= await fetch("http://192.168.0.17:3000/user");
      const users= await response.json();

      const user= users.find(user => user.email === email && user.password === password);

      if(user){
        setErrorMessage(""); 
        setSuccessMessage("Đăng nhập thành công !");
        
        await AsyncStorage.setItem('loggedInUserEmail', email); // lưu email đăng nhập

        setTimeout(() => {
          setSuccessMessage("");
          navigation.navigate("Home");
        }, 500);
                
        if (rememberTK) {
          await AsyncStorage.setItem('savedEmail', email);
          await AsyncStorage.setItem('savedPassword', password);
          await AsyncStorage.setItem('rememberTK', 'true');
        } else {
          await AsyncStorage.removeItem('savedEmail');
          await AsyncStorage.removeItem('savedPassword');
          await AsyncStorage.setItem('rememberTK', 'false');
        }
      }
      else if(!email.trim() || !password.trim()){
        setErrorMessage("Enter a valid email address or password");
      }
      else{
        setErrorMessage("Invalid email or password. Try Again !");
      }
      
    } catch (error) {
      console.error("Error fetching users: ", error);
      setErrorMessage("Có lỗi xảy ra. Vui lòng thử lại !");
    }

  }

  const fontsLoaded = useFonts();

  if (!fontsLoaded) {
    return (
      <View style={styles.container}>
        <Text>Loading fonts...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Image source={require("../images/Plant_Login.png")} style={styles.background} />

        <Text style={styles.welcomeText}>Chào mừng bạn</Text>

        <Text style={styles.loginText}>Đăng nhập tài khoản</Text>

        <TextInput
          placeholder="Nhập email hoặc số điện thoại"
          style={[styles.textInputlogin, { top: 20 }, {borderColor: isFocusedTK ? "#009245" : "#8B8B8B"}]}
          onFocus={() => setIsFocusedTK(true)}
          onBlur={() => setIsFocusedTK(false)}
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          placeholder="Mật khẩu"
          style={[styles.textInputlogin, { top: 30 }, {borderColor: isFocusedMK ? "#009245" : "#8B8B8B"}]}
          secureTextEntry= {secureText}
          onFocus={() => setIsFocusedMK(true)}
          onBlur={() => setIsFocusedMK(false)}
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity onPress={() => setSecureText(!secureText)}>
        <Image 
            source={secureText ? require("../images/uncheckMK.png") : require("../images/checkMK.png")}
            style={styles.btnMK}
          />
        </TouchableOpacity>

        {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

        <TouchableOpacity onPress={() => setRememberTK(!rememberTK)}>
          <Image
            source={rememberTK ? require("../images/checkRemember.png") : require("../images/uncheckRemember.png")} 
            style={styles.btnRemember}
          />

          <Text style={styles.textRMB}>Nhớ tài khoản</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={styles.textForgotPS}>Forgot Password ?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnDN} onPress={validateLogin}>
          <Image source={require("../images/btn_Login.png")} style={styles.imageDN} />
          <Text style={styles.textDN}>Đăng nhập</Text>
        </TouchableOpacity>

        <View style={styles.orContainer}>
          <View style={styles.line} />
          <Text style={styles.orText}>Hoặc</Text>
          <View style={styles.line} />
        </View>

        <View style={styles.containerOther}>
        <TouchableOpacity >
          <Image source={require("../images/Ic_Google.png")} />
        </TouchableOpacity>

        <TouchableOpacity >
          <Image source={require("../images/Ic_Facebook.png")} />
        </TouchableOpacity>
        </View>

        <View style={styles.containerTextSignUp}>
        <Text>Bạn không có tài khoản ?</Text>

        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
        <Text style={styles.textSignUp}>Tạo tài khoản</Text>
        </TouchableOpacity>
        </View>

        {successMessage ? (<View style={styles.successMessage}><Text style={styles.successText}>{successMessage}</Text></View>) : null}

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  background: {
    width: 450,
    height: 400,
  },
  welcomeText: {
    fontWeight: "700", 
    fontSize: 35,
    fontFamily: "Poppins-Regular",
  },
  loginText: {
    fontWeight: "400", 
    fontSize: 18,
    fontFamily: "Poppins-Regular",
    top: 5,
  },
  textInputlogin: {
    borderRadius: 10,
    borderWidth: 1,
    width: 360,
    height: 56,
    paddingHorizontal: 10,
  },
  btnMK:{
    width: 45,
    height: 29,
    left: 145,
    bottom: 10
  },
  btnRemember:{
    top: 15,
    right: 136,
  },
  textRMB:{
    color: "#8B8B8B",
    right: 112,
    bottom: 5,
    fontWeight: "400",
  },
  textForgotPS:{
    color: "#009245",
    left: 120,
    bottom: 23,
    fontWeight: "500",
  },
  btnDN:{
    alignItems: "center"
  },
  imageDN:{
    width: 360,
    height: 55,
    borderRadius: 15,
  },
  textDN:{
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 20,
    bottom: 40,
  },
  orContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  line: {
    width: 147,
    height: 1.4,
    backgroundColor: "#4CAF50",
  },
  orText: {
    marginHorizontal: 10,
    fontSize: 16,
    fontWeight: "500",
    color: "#000",
  },
  containerOther:{
    flexDirection: "row",
    justifyContent: "space-between",
    width: 100,
    top: 20,
  },
  containerTextSignUp:{
    flexDirection: "row",
    justifyContent: "space-between",
    width: 245,
    top: 50,
  },
  textSignUp:{
    color: "#009245"
  },
  errorText: {
    color: "red",
    fontSize: 13,
    marginBottom: 10,
    top: 13,
  },
  successMessage: {
    position: "absolute",
    bottom: 70,
    backgroundColor: "green",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  successText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});