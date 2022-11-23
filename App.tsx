import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
// import StackNavigation from './src/navigations/StackNavigation';
import DrawerNavigation from './src/navigations/DrawerNavigation';

export default function App() {
  return (
    <NavigationContainer>
      {/* <StackNavigation /> */}
      <DrawerNavigation />
    </NavigationContainer>
  );
}
