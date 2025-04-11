import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  LayoutAnimation,
  Platform,
  UIManager,
  ScrollView,
  Image
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

if (Platform.OS === "android") {
  UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

const questions = [
  {
    question: "Tôi trộn các chất dinh dưỡng theo thứ tự nào?",
    answer: "A, B, C, D,F rồi line E Root Igniter. Nên pha vào xô và cho máy sục oxy vào thì khơi pha dd sẽ tan đều.",
  },
  {
    question: "Tôi có thể giữ dung dịch dinh dưỡng hỗn hợp trong bao lâu?",
    answer: "Dinh dưỡng cao cấp nên ko có hạn sử dụng, chỉ cần bảo quản tốt dưới nhiệt độ mát, tránh ánh sáng trực tiếp là sẽ để được rất lâu, Để duy trì mức dinh dưỡng tối ưu, chúng tôi khuyên bạn nên thay đổi hồ chứa thuỷ canh của bạn sau mỗi 7 ngày, còn với thổ canh thì pha lần nào tưới lần đó, thừa thì bỏ lần sau pha mới. Đặc biệt có vi sinh Mycorrhizae có hạn sử dụng sau 2 năm kể từ ngày mua.",
  },
  {
    question: "Khi nào tôi thêm bộ điều chỉnh pH?",
    answer: "Sau khi bạn thêm A-F nhưng trước khi bạn thêm line E Root Igniter vào thì phải căn chỉnh pH trước rồi. PH tối ưu là giữa 5,8-6,3, nấm rễ phát triển tốt hơn khi pH chuẩn, dinh dưỡng đủ. Bạn cần thêm 1 số công cụ bút đo nữa nhé.",
  },
  {
    question: "Các chất điều chỉnh tăng trưởng có được sử dụng trong các sản phẩm Planta không?",
    answer: "Không. Chúng tôi không sử dụng bất kỳ chất điều chỉnh tăng trưởng nào trong dòng Nutrient của mình. Điều này bao gồm Paclobutrazol và Daminozide, được chứng minh là có ảnh hưởng tiêu cực đến sức khỏe khi con người ăn phải, đặc biệt là Ung Thư.",
  },
  {
    question: "Các sản phẩm Planta có phải là hữu cơ không?",
    answer: "Các sản phẩm dinh dưỡng của chúng tôi là sự pha trộn của tất cả các thành phần hữu cơ và vô cơ tự nhiên, không chứa hormone, nước hoa, thuốc nhuộm hoặc chất điều hòa tăng trưởng. Chúng đã được thiết kế đặc biệt để tối đa hóa khả dụng sinh học của các chất dinh dưỡng để hấp thụ và hiệu quả tối ưu. Chúng tôi hiểu được sự hấp thụ của một khu vườn hữu cơ. Quan trọng hơn, độ chính xác như vậy mang lại kết quả vượt trội với một giải pháp hoàn toàn hữu cơ. Chúng tôi tiếp tục phát triển các sản phẩm hữu cơ để thử nghiệm và sẽ cung cấp cho các thị trường dựa trên những kết quả chúng tôi thu thập được .",
  },
];

const QA = ({ navigation }: any) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpand = (index: number) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
      
            <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                <Image source={require("../images/ic_back.png")}/>
            </TouchableOpacity>

            <Text style={styles.textGT}>Q & A</Text>
            </View>
      
      {questions.map((item, index) => (
        <View key={index} style={styles.card}>
          <TouchableOpacity
            onPress={() => toggleExpand(index)}
            style={styles.questionRow}
          >
            <Text style={styles.question}>{item.question}</Text>
            <Ionicons
              name={
                expandedIndex === index ? "chevron-up" : "chevron-down"
              }
              size={20}
              color="black"
            />
          </TouchableOpacity>
          {expandedIndex === index && (
            <Text style={styles.answer}>{item.answer}</Text>
          )}
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: "#fff",
    flexGrow: 1,
    
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    bottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
  },
  card: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingVertical: 12,
  },
  questionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  question: {
    fontSize: 16,
    fontWeight: "500",
    flex: 1,
  },
  answer: {
    marginTop: 8,
    fontSize: 15,
    color: "#444",
  },
  containerHeader:{
    flexDirection: "row",
    marginTop: 10,
    width: 400,
    marginLeft: 25,
},
textGT:{
    right: 180,
    fontWeight: "500",
    fontSize: 16,
},
});

export default QA;