import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from "react-native";

export default function DetailScreen({ route }) {
  const { item } = route.params;
  const [tab, setTab] = useState("효능/용법");

  return (
    <ScrollView style={styles.container}>
      {/* 약품 기본 정보 */}
      <View style={styles.card}>
        {/* 약 이미지 */}
        <Image source={{ uri: item.image }} style={styles.image} />

        {/* 텍스트 정보 */}
        <View style={styles.info}>
            {/* 이름 + 가격 */}
            <View style={styles.rowBetween}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.price}>{item.price}</Text>
            </View>
                {/* 영문명 (예시) */}
                <Text style={styles.engName}>Acetaminophen Tab. 500mg</Text>

            {/* 태그 */}
            <View style={styles.tagContainer}>
            {item.tags.map((tag, i) => (
                <Text key={i} style={styles.tag}>{tag}</Text>
            ))}
            </View>
                {/* 제조사 / 유통사 */}
                <Text style={styles.company}>제조사: {item.company}</Text>
                <Text style={styles.distributor}>유통사: {item.distributor}</Text>
            </View>
        </View>

      {/* 탭 메뉴 */}
      <View style={styles.tabs}>
        {["효능/용법", "주의사항", "기타정보"].map((t) => (
          <TouchableOpacity
            key={t}
            onPress={() => setTab(t)}
            style={[styles.tab, tab === t && styles.tabActive]}
          >
            <Text style={[styles.tabText, tab === t && styles.tabTextActive]}>
              {t}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* 탭 내용 */}
      {tab === "효능/용법" && (
        <View>
            {/* 주성분 */}
            <View style={[styles.section]}>
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionIcon}>🟢</Text>
                    <Text style={styles.sectionTitle}>주성분</Text>
                </View>
                <View style={styles.sectionHeader}>
                    {item.ingredient.map((e, i) => (
                    <View key={i} style={styles.effectRow}>
                        <Text style={styles.effectDot}>🔵</Text>
                        <Text style={styles.effectText}>{e}</Text>
                    </View>
                ))}
                </View>
            </View>
            {/* 섹션 제목 */}
            <View style={styles.section}>
                <View style={[styles.sectionHeader]}>
                    <Text style={styles.sectionIcon}>🟢</Text>
                    <Text style={styles.sectionTitle}>효능 및 효과</Text>                
                </View>
                {/* 리스트 */}
                {item.effect.map((e, i) => (
                    <View key={i} style={styles.effectRow}>
                        <Text style={styles.effectDot}>🔵</Text>
                        <Text style={styles.effectText}>{e}</Text>
                    </View>
                ))}
            </View>
            {/* 용법 및 용량 */}
            <View style={[styles.sectionHeader, styles.section]}>
                <Text style={styles.sectionIcon}>🟢</Text>
                <Text style={styles.sectionTitle}>용법 및 용량</Text>
            </View>

            
        </View>
      )}

      {tab === "주의사항" && (
        <View style={styles.section}>
          <Text>⚠️ 간질환 환자 주의</Text>
          <Text>⚠️ 과다 복용 시 간 손상 가능</Text>
        </View>
      )}

      {tab === "기타정보" && (
        <View style={styles.section}>
          <Text>보관방법: 실온 보관</Text>
          <Text>포장단위: 10정/1박스</Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 16 },
  header: { flexDirection: "row", marginBottom: 16 },
  image: { width: 80, height: 80, marginRight: 12, borderRadius: 8 },
  name: { fontSize: 18, fontWeight: "bold" },
  company: { fontSize: 12, color: "gray" },
  price: { fontSize: 16, fontWeight: "bold", color: "#007bff", marginTop: 4 },
  tabs: { flexDirection: "row", marginVertical: 12 },
  tab: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: "#f0f0f0",
    borderRadius: 16,
    marginRight: 8,
  },
  tabActive: { backgroundColor: "#007bff" },
  tabText: { color: "#333", fontSize: 14 },
  tabTextActive: { color: "#fff" },
  section: { marginBottom: 20 },
  subTitle: { fontSize: 14, fontWeight: "bold", marginVertical: 6 },
  effectRow: {
  flexDirection: "row",
  alignItems: "flex-start",
  marginBottom: 4,
},
section: {
  marginVertical: 12,
  paddingBottom: 12,
  borderBottomWidth: 1,
  borderBottomColor: "#eee",
},
sectionHeader: {
  flexDirection: "row",
  alignItems: "center",
  marginBottom: 8,
},
sectionIcon: {
  fontSize: 14,
  marginRight: 6,
},
sectionTitle: {
  fontSize: 15,
  fontWeight: "bold",
  color: "#2b7a0b", // 진한 초록색
},
effectRow: {
  flexDirection: "row",
  alignItems: "flex-start",
  marginBottom: 6,
},
effectDot: {
  fontSize: 10,
  marginTop: 4,
  marginRight: 6,
  color: "#007bff", // 파란색 점
},
effectText: {
  flex: 1,
  fontSize: 14,
  color: "#333",
  lineHeight: 20,
},
card: {
  flexDirection: "row",
  padding: 12,
  borderRadius: 12,
  backgroundColor: "#fff",
  borderWidth: 1,
  borderColor: "#eee",
  marginBottom: 16,
  shadowColor: "#000",
  shadowOpacity: 0.05,
  shadowRadius: 4,
  elevation: 2,
},
image: {
  width: 80,
  height: 80,
  borderRadius: 8,
  marginRight: 12,
},
info: {
  flex: 1,
  justifyContent: "center",
},
rowBetween: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
},
name: {
  fontSize: 16,
  fontWeight: "bold",
},
price: {
  fontSize: 16,
  fontWeight: "bold",
  color: "#007bff",
},
engName: {
  fontSize: 12,
  color: "gray",
  marginBottom: 4,
},
tagContainer: {
  flexDirection: "row",
  flexWrap: "wrap",
  marginBottom: 6,
},
tag: {
  fontSize: 11,
  color: "#007bff",
  backgroundColor: "#e6f0ff",
  paddingHorizontal: 6,
  paddingVertical: 2,
  borderRadius: 12,
  marginRight: 4,
  marginBottom: 2,
},
company: {
  fontSize: 12,
  color: "#333",
},
distributor: {
  fontSize: 12,
  color: "#555",
},


});
