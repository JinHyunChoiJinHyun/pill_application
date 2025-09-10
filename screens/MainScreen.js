import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';


import { StyleSheet, Text, View, Button, TextInput, FlatList, TouchableOpacity } from 'react-native';

export default function MainScreen({navigation}) {
  
  console.log(navigation)
  const categories = [
    { id: "1", title: "감기약", desc: "콧물, 기침, 열", icon: "💊" },
    { id: "2", title: "해열제", desc: "발열, 두통", icon: "🥵" },
    { id: "3", title: "소화제", desc: "속쓰림, 소화불량", icon: "🌿" },
    { id: "4", title: "외상치료", desc: "상처, 염증", icon: "💉" },
    { id: "5", title: "진통제", desc: "두통, 관절통", icon: "💙" },
    { id: "6", title: "알레르기", desc: "알레르기, 가려움", icon: "🤧" },
    { id: "7", title: "영양제", desc: "비타민, 보조제", icon: "🍊" },
    { id: "8", title: "기타", desc: "전체 카테고리", icon: "➕" },
  ];

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => navigation.navigate("Medicine", { item })}>
      <Text style={styles.icon}>{item.icon}</Text>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.desc}>{item.desc}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchBox}>
        <TextInput style={styles.input} placeholder='의약품명, 증상, 효능을 검색하세요' />
        <View style={styles.iconGroup}>
          <Ionicons name="camera-outline" size={24} color="gray" onPress={() => navigation.navigate("Camera")}/>    
          <Ionicons name="search-outline" size={24} color="gray" />
        </View>
      </View>
      {/* 카테고리 목록 */}
      <FlatList
        data={categories}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginBottom: 20,    
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  iconGroup: {
    flexDirection: "row",
    gap: 12,  // RN 최신버전 지원. 구버전이면 대신 margin 사용
    marginLeft: 8,
  },
  list: {
    paddingBottom: 20,
  },
  row: {
    justifyContent: "space-between",
  },
  card: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    margin: 8,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  icon: {
    fontSize: 32,
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  desc: {
    fontSize: 13,
    color: "gray",
    textAlign: "center",
  },

});
