/* eslint-disable prettier/prettier */
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import VisorSkinScreen from '../screens/VisorSkinScreen';
import FavoriteScreen from '../screens/FavoriteScreen';

export type RootStackParams = {
  HomeScreen: undefined;
  VisorSkinScreen: {
    skin: string;
    name: string;
  };
  FavoriteScreen: undefined;
};

const Stack = createStackNavigator();

const StackNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#009688FF',
        },
        headerTintColor: '#fff',
        cardStyle: {
          backgroundColor: '#0081A7',
        },
        title: '',
      }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="VisorSkinScreen" component={VisorSkinScreen} />
      <Stack.Screen name="FavoriteScreen" component={FavoriteScreen} />
    </Stack.Navigator>
  );
};

export default StackNavigation;
