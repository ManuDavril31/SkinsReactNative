import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
// import StackNavigation from './src/navigations/StackNavigation';
import DrawerNavigation from './src/navigations/DrawerNavigation';
import {AuthProvider} from './src/context/AuthContext';

export default function App() {
  const AppState = ({children}: any) => {
    return <AuthProvider>{children}</AuthProvider>;
  };

  return (
    <NavigationContainer>
      {/* <StackNavigation /> */}
      <AppState>
        <DrawerNavigation />
      </AppState>
    </NavigationContainer>
  );
}
