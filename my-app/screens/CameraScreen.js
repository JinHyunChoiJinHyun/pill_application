import { CameraView, useCameraPermissions } from 'expo-camera';
import { useState, useRef } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { analyzeImage } from '../utils/vision';
import { useIsFocused } from "@react-navigation/native";
import { searchDrugByShape } from "../utils/drugApi";


export default function CameraScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [facing, setFacing] = useState('back');
  const cameraRef = useRef(null);
  const isFocused = useIsFocused(); // ✅ 화면 포커스 여부 감지

  if (!permission) return <View />;
  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text>카메라 권한이 필요합니다.</Text>
        <Button onPress={requestPermission} title="권한 요청" />
      </View>
    );
  }

  const takePicture = async () => {
    if (!cameraRef.current) {
      console.log('❌ cameraRef 없음 (카메라 준비 전)');
      return;
    }
    try {
      console.log("촬영 버튼 눌림");
      const photo = await cameraRef.current.takePictureAsync({ base64: true });
      console.log('📸 촬영 성공:', photo.uri);
      const { text, mainColor } = await analyzeImage(photo.base64);
      console.log('인식된 텍스트:', text);
      console.log('대표 색상:', mainColor);
    } catch (err) {
      console.log('❌ 촬영 오류:', err);
    }
  };

  return (
    <View style={styles.container}>
      {isFocused && (
        <CameraView
          ref={cameraRef}
          style={styles.camera}
          facing={facing}
          onCameraReady={() => console.log('✅ 카메라 준비됨')}
        />
      )}
      <View style={styles.overlay}>
        <Button
          title="카메라 전환"
          onPress={() => setFacing(facing === 'back' ? 'front' : 'back')}
        />
        <Button title="촬영 후 분석" onPress={takePicture} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  camera: { flex: 1 },
  overlay: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
