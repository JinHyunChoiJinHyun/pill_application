import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Image } from "react-native";

export default function MedicineList({navigation}) {
  const [selectedTab, setSelectedTab] = useState("전체");

  const categories = ["전체", "해열진통제", "기침감기약", "코감기약", "목감기약"];

  const medicines = [
    {
      id: "1",
      name: "아세트아미노펜정 500mg",
      company: "한국제약(주)",
      distributor: "메디팜유통(주)",
      price: "3,200원",
      tags: ["해열진통제", "원형정"],
      desc: "감기로 인한 발열 및 통증",
      ingredient: ["아세트아미노펜 500mg"],
      effect: ["감기로 인한 발열 및 통증", "두통, 신경통, 근육통, 염좌통"],
      dosage: {
        adult: "1회 1정(500mg), 1일 3~4회, 4시간 이상 간격. 최대 4000mg(8정)",
        child: "만 12세 미만 복용 금지. 만 12세 이상 청소년은 성인과 동일"
      },
      image: "https://via.placeholder.com/100.png?text=💊",
    },
    {
      id: "2",
      name: "덱스트로메토르판시럽",
      company: "대한제약(주)",
      distributor: "대한제약유통(주)",
      price: "4,500원",
      tags: ["기침감기약", "시럽제"],
      desc: "감기, 기관지염으로 인한 기침",
      image: "https://via.placeholder.com/50x50.png?text=🥤",
      ingredient: "덱스트로메토르판 하이드로브로마이드",
      effect: ["기침 완화", "기관지 자극 완화"],
      dosage: {
        adult: "1회 10ml, 1일 3회 복용",
        child: "만 12세 미만 복용 금지. 만 12세 이상 청소년은 성인과 동일"
      }
    },
    {
      id: "3",
      name: "이부프로펜정 200mg",
      company: "유한양행(주)",
      distributor: "유한양행유통(주)",
      price: "2,800원",
      tags: ["해열진통제", "원형정"],
      desc: "감기로 인한 발열 및 통증",
      image: "https://via.placeholder.com/50x50.png?text=💊",
      ingredient: "이부프로펜 200mg",
      effect: ["발열 완화", "두통, 근육통, 생리통 완화"],
      dosage: {
        adult: "1회 1정(200mg), 1일 3회, 식후 복용",
        child: "만 12세 미만 복용 금지"
      }
    },
    {
      id: "4",
      name: "로젠지 목캔디",
      company: "CJ제일제당(주)",
      distributor: "CJ 유통(주)",
      price: "1,500원",
      tags: ["목감기약", "로젠지"],
      desc: "인후염, 편도염으로 인한 목 아픔",
      image: "https://via.placeholder.com/50x50.png?text=🍬",
      ingredient: "멘톨, 허브 추출물",
      effect: ["목 통증 완화", "인후부 자극 완화", "구강 상쾌감"],
      dosage: {
        adult: "1회 1정, 필요 시 천천히 녹여서 복용. 1일 최대 6정",
        child: "만 6세 이상은 1일 3정까지 복용 가능"
      }
    }
  ];

  const filteredData =
    selectedTab === "전체"
      ? medicines
      : medicines.filter((m) => m.tags.includes(selectedTab));

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => navigation.navigate("Detail", { item })}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.company}>{item.company}</Text>
        <View style={styles.tagContainer}>
          {item.tags.map((tag, idx) => (
            <Text key={idx} style={styles.tag}>
              {tag}
            </Text>
          ))}
        </View>
        <Text style={styles.desc}>{item.desc}</Text>
      </View>
      <Text style={styles.price}>{item.price}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* 검색창 */}
      <Text style={styles.title}>감기약 정보</Text>
      <TextInput
        placeholder="약품명, 제조사, 카테고리로 검색"
        style={styles.searchBox}
      />

      {/* 탭 메뉴 */}
      <View style={styles.tabs}>
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat}
            onPress={() => setSelectedTab(cat)}
            style={[styles.tab, selectedTab === cat && styles.tabActive]}
          >
            <Text
              style={[
                styles.tabText,
                selectedTab === cat && styles.tabTextActive
              ]}
            >
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* 리스트 */}
      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 30 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 16 },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  searchBox: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 10,
    marginBottom: 12
  },
  tabs: { flexDirection: "row", marginBottom: 12 },
  tab: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: "#f0f0f0",
    borderRadius: 16,
    marginRight: 8
  },
  tabActive: { backgroundColor: "#007bff" },
  tabText: { color: "#333", fontSize: 14 },
  tabTextActive: { color: "#fff" },
  card: {
    flexDirection: "row",
    alignItems: "flex-start",
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12
  },
  image: { width: 50, height: 50, marginRight: 12 },
  info: { flex: 1 },
  name: { fontSize: 16, fontWeight: "bold" },
  company: { fontSize: 12, color: "gray", marginBottom: 4 },
  tagContainer: { flexDirection: "row", flexWrap: "wrap", marginBottom: 4 },
  tag: {
    fontSize: 11,
    color: "#007bff",
    backgroundColor: "#e6f0ff",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 12,
    marginRight: 4,
    marginBottom: 2
  },
  desc: { fontSize: 12, color: "#555" },
  price: { fontSize: 14, fontWeight: "bold", marginLeft: 8, alignSelf: "center" }
});
