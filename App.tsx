import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
// import StackNavigation from './src/navigations/StackNavigation';
import DrawerNavigation from './src/navigations/DrawerNavigation';
import {AuthProvider} from './src/context/AuthContext';

import {ToastProvider} from 'react-native-toast-notifications';

import {initialDataBase} from './src/data/DB';

export default function App() {
  const AppState = ({children}: any) => {
    return <AuthProvider>{children}</AuthProvider>;
  };

  useEffect(() => {
    initialDataBase();
  }, []);

  return (
    <ToastProvider>
      <NavigationContainer>
        {/* <StackNavigation /> */}
        <AppState>
          <DrawerNavigation />
        </AppState>
      </NavigationContainer>
    </ToastProvider>
  );
}
