// utils/vision.js

import { GOOGLE_API_KEY } from "@env";

export async function analyzeImage(base64Photo) {
  const body = {
    requests: [
      {
        image: { content: base64Photo },
        features: [
          { type: "TEXT_DETECTION" },       // 각인 OCR
          { type: "IMAGE_PROPERTIES" }      // 색상 분석
        ]
      }
    ]
  };

  const response = await fetch(
    `https://vision.googleapis.com/v1/images:annotate?key=${GOOGLE_API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    }
  );

  const result = await response.json();

  // OCR 텍스트
  const text = result.responses[0].fullTextAnnotation?.text || "";

  // 대표 색상
  const colors = result.responses[0].imagePropertiesAnnotation?.dominantColors?.colors || [];
  let mainColor = "";
  if (colors.length > 0) {
    const { red, green, blue } = colors[0].color;
    mainColor = `rgb(${red},${green},${blue})`;
  }

  return { text, mainColor };
}
