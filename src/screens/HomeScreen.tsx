/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useEffect} from 'react';
import {DrawerScreenProps} from '@react-navigation/drawer';
import {RootStackParams} from '../navigations/StackNavigation';
import Icon from 'react-native-vector-icons/Ionicons';
import {AuthContext} from '../context/AuthContext';
import {saveUrlToCameraRoll} from '../helpers/saveToGallery';
import {Recicler} from '../components/Recicler';

interface Props extends DrawerScreenProps<RootStackParams, 'HomeScreen'> {}

const HomeScreen = ({navigation}: Props) => {
  const {uriSkin, data, isLoading, setData} = useContext(AuthContext);

  const renderIconsMenu = () => {
    return (
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          style={styles.Menu}
          onPress={() => {
            saveUrlToCameraRoll([uriSkin]);
          }}>
          <Icon name="cloud-download-outline" size={30} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.Menu} onPress={navigation.toggleDrawer}>
          <Icon name="heart-outline" size={30} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.Menu} onPress={navigation.toggleDrawer}>
          <Icon name="share-social-outline" size={30} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.Menu} onPress={navigation.toggleDrawer}>
          <Icon name="star-outline" size={30} color="#fff" />
        </TouchableOpacity>
      </View>
    );
  };

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity style={styles.Menu} onPress={navigation.toggleDrawer}>
          <Icon name="menu-outline" size={30} color="#fff" />
        </TouchableOpacity>
      ),
      // title: `${nameSkin}`,
      headerRight: () => renderIconsMenu(),
    });
  }, [uriSkin]);

  if (isLoading) {
    return <ActivityIndicator size={100} color="#FFF" />;
  }

  return (
    <>
      <Recicler data={data} isLoading={isLoading} setData={setData} />
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  HomeContainer: {
    // flex: 1,
    // flexDirection: 'row',
    // flexWrap: 'wrap',
  },
  Menu: {
    marginLeft: 20,
    marginRight: 10,
  },
});
//
