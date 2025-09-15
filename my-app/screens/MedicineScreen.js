import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { searchDrugByKeyword } from "../api/drugApi";

export default function MedicineScreen({ route, navigation }) {
  const { item } = route.params; // 카테고리 정보
  const [drugs, setDrugs] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const result = await searchDrugByKeyword(item.title);
      setDrugs(result);
    }
    fetchData();
  }, [item]);

  // API → DetailScreen용 데이터 변환
  const mapDrugData = (drug) => ({
    image: drug.ITEM_IMAGE,
    name: drug.ITEM_NAME,
    company: drug.ENTP_NAME,
    distributor: drug.ENTP_NAME,
    ingredient: (drug.MAIN_INGREDIENTS || "").split(","),
    effect: (drug.EE_DOC_DATA || "").split("."),
    usage: drug.UD_DOC_DATA || "",
    warning: drug.NB_DOC_DATA || "",
    price: "-", // API에 가격 없음 → 일단 "-"
    tags: ["해열", "진통"], // 임시 태그
    barcode: drug.BAR_CODE,
  });

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>{item.title}</Text>
      <FlatList
        data={drugs}
        keyExtractor={(drug, idx) => idx.toString()}
        renderItem={({ item: drug }) => {
          const mapped = mapDrugData(drug);
          return (
            <TouchableOpacity onPress={() => navigation.navigate("Detail", { item: mapped })}>
              <Text style={{ fontWeight: "bold" }}>{mapped.name}</Text>
              <Text>{mapped.company}</Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}
