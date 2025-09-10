// // utils/vision.js
// export async function detectText(base64Photo) {
//   const body = {
//     requests: [
//       {
//         image: { content: base64Photo },
//         features: [{ type: "TEXT_DETECTION" }]
//       }
//     ]
//   };

//   const response = await fetch(
//     `https://vision.googleapis.com/v1/images:annotate?key=YOUR_API_KEY`,
//     {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(body)
//     }
//   );

//   const result = await response.json();
//   return result.responses[0].fullTextAnnotation?.text;
// }
