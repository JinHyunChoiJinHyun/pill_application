import { PILL_API_KEY } from "@env";

export async function searchDrugByShape({ print, color }) {
  const url = `https://apis.data.go.kr/1471000/DrbEasyDrugInfoService/getDrbEasyDrugList?serviceKey=${PILL_API_KEY}&itemName=${print}&type=json`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.body?.items || [];
  } catch (error) {
    console.error("API 호출 오류:", error);
    return [];
  }
}
