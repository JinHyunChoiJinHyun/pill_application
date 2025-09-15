import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MainScreen from './screens/MainScreen';
import MedicineScreen from './screens/MedicineList';
import DetailScreen from './screens/DetailScreen';
import CameraScreen from './screens/CameraScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={MainScreen} />
        <Stack.Screen name="Medicine" component={MedicineScreen} />
        <Stack.Screen name="Detail" component={DetailScreen} />
        <Stack.Screen name="Camera" component={CameraScreen} options={{ title: "약품 촬영" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
