import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity, SafeAreaView, Alert } from "react-native";
import { useState, useEffect } from "react";


export default function Register({navigation}: any) {

  const [name, setName]= useState("");
  const [email, setEmail]= useState("");
  const [phone, setPhone]= useState("");
  const [password, setPassword]= useState("");

  const [secureText, setSecureText] = useState(true);
  const [isFocusedTen, setIsFocusedTen] = useState(false);
  const [isFocusedEmail, setIsFocusedEmail] = useState(false);
  const [isFocusedPhone, setIsFocusedPhone] = useState(false);
  const [isFocusedPass, setIsFocusedPass] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  //ham dang ky
  const handleRegister= async () =>{
    if(!name || !email || !phone || !password){
      Alert.alert("Lỗi", "Vui lòng nhập đầy đủ thông tin");
      return
    }

    try {
      //ktra email da ton tai chua
      const checkResponse= await fetch("http://192.168.0.17:3000/user");
      const users= await checkResponse.json();
      const userExists= users.some((user: any) => user.email === email);

      if(userExists){
        Alert.alert("Lỗi", "Email đã tồn tại. Vui lòng sử dụng email khác");
        return;
      }

      //gui yeu cau POST luu tai khoan moi
      const response= await fetch("http://10.24.24.230:3000/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          password,
        }),
      });

      if(response.ok){
        setSuccessMessage("Đăng ký thành công !");

        setTimeout(() => {
          setSuccessMessage("");
          navigation.navigate("Login");
        }, 500);
      }else{
        Alert.alert("Lỗi", "Đăng ký thất bại. Vui lòng thử lại !");
      }
      
    } catch (error) {
      console.error("Lỗi đăng ký: ", error);
      Alert.alert("Lỗi", "Không thể kết nối đến server. Hãy thử lại !");
      
    }
  };

  

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <Image source={require("../images/Plant_SignUp.png")} style={styles.background}/>

         <Text style={styles.welcomeText}>Đăng ký</Text>
        
         <Text style={styles.registerText}>Tạo tài khoản</Text>

         <TextInput
                   placeholder="Họ và tên"
                   style={[styles.textInputregister, {borderColor: isFocusedTen ? "#009245" : "#8B8B8B"}]}
                   onFocus={() => setIsFocusedTen(true)}
                   onBlur={() => setIsFocusedTen (false)}
                   value={name}
                   onChangeText={setName}
                 />

        <TextInput
                  placeholder="E-mail"
                  style={[styles.textInputregister, { top: 10 }, {borderColor: isFocusedEmail ? "#009245" : "#8B8B8B"}]}
                  onFocus={() => setIsFocusedEmail(true)}
                  onBlur={() => setIsFocusedEmail(false)}
                  value={email}
                  onChangeText={setEmail}
                />

        <TextInput
                  placeholder="Số điện thoại"
                  style={[styles.textInputregister, { top: 20 }, {borderColor: isFocusedPhone ? "#009245" : "#8B8B8B"}]}
                  onFocus={() => setIsFocusedPhone(true)}
                  onBlur={() => setIsFocusedPhone(false)}
                  value={phone}
                  onChangeText={setPhone}
                />

        <TextInput
                  placeholder="Mật khẩu"
                  s style={[styles.textInputregister, { top: 30 }, {borderColor: isFocusedPass ? "#009245" : "#8B8B8B"}]}
                  onFocus={() => setIsFocusedPass(true)}
                  onBlur={() => setIsFocusedPass(false)}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={secureText}
                />

        <Text style={styles.containerTerms}>Để đăng kí tài khoản, bạn đồng ý {" "}
          <TouchableOpacity><Text style={styles.textTerms}>Terms &</Text></TouchableOpacity> {" "}
          <TouchableOpacity><Text style={styles.textTerms}>Conditions</Text></TouchableOpacity>
          {" "}and{" "}
          <TouchableOpacity><Text style={styles.textTerms}>Privacy Policy</Text></TouchableOpacity>
        </Text>

        <TouchableOpacity style={styles.btnDN} onPress={handleRegister}>
                  <Image source={require("../images/btn_Login.png")} style={styles.imageDN} />
                  <Text style={styles.textDN}>Đăng ký</Text>
                </TouchableOpacity>
        
                <View style={styles.orContainer}>
                  <View style={styles.line} />
                  <Text style={styles.orText}>Hoặc</Text>
                  <View style={styles.line} />
                </View>
        
                {/* DN Other */}
                <View style={styles.containerOther}>
                <TouchableOpacity >
                  <Image source={require("../images/Ic_Google.png")} />
                </TouchableOpacity>

                <TouchableOpacity >
                  <Image source={require("../images/Ic_Facebook.png")} />
                </TouchableOpacity>
                </View>
                
                <View style={styles.containerTextSignUp}>
                  <Text>Tôi đã có tài khoản </Text>
                
                  <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                  <Text style={styles.textSignUp}>Đăng nhập</Text>
                  </TouchableOpacity>
                </View>

                {successMessage ? (<View style={styles.successMessage}><Text style={styles.successText}>{successMessage}</Text></View>) : null}
                
        
      </View>
    </SafeAreaView>
  );
}

const styles= StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  background:{
    width: 450,
    height: 250,
  },
  welcomeText: {
    fontWeight: "700", 
    fontSize: 35,
    fontFamily: "Poppins-Regular",
    bottom: 20,
  },
  registerText: {
    fontWeight: "400", 
    fontSize: 18,
    fontFamily: "Poppins-Regular",
    bottom: 10,
  },
  textInputregister: {
    borderRadius: 10,
    borderWidth: 1,
    width: 360,
    height: 56,
    borderColor: "#8B8B8B",
    paddingHorizontal: 10,
  },
  containerTerms:{
    width: 330,
    top: 45,
    alignItems: "center",
    left: 25,
    fontSize: 15,
  },
  textTerms:{
    color: "#009245",
    textDecorationLine: "underline",
    top: 4,
  },
  btnDN:{
    top: 65,
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
    marginTop: 65,
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
    top: 30,
  },
  containerTextSignUp:{
    flexDirection: "row",
    width: 245,
    top: 70,
    left: 40,
  },
  textSignUp:{
    color: "#009245"
  },
  successMessage: {
    position: "absolute",
    bottom: 85,
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
})