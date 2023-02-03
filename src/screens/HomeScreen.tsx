/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
import {
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Dimensions,
  View,
} from 'react-native';
import React, {useContext, useEffect} from 'react';
import ButtonCustom from '../components/ButtonCustom';
import {FlashList} from '@shopify/flash-list';
import {DrawerScreenProps} from '@react-navigation/drawer';
import {RootStackParams} from '../navigations/StackNavigation';
import Icon from 'react-native-vector-icons/Ionicons';

import {useSpreedSheet} from '../hooks/useSpreedSheet';
import {Row} from '../interfaces/SpreedSheetApi';
import {SkinView} from '../components/visorScreen/SkinView';
import {AuthContext} from '../context/AuthContext';
import {saveUrlToCameraRoll} from '../helpers/saveToGallery';
import {deleteSkin, insertSkin} from '../data/DB';

interface PropsItem {
  item: Row;
}

const height = Dimensions.get('window').height / 2 - 50;
const width = Dimensions.get('window').width; // - 55

interface Props extends DrawerScreenProps<RootStackParams, 'HomeScreen'> {}

const HomeScreen = ({navigation}: Props) => {
  const {data, setData, isLoading} = useSpreedSheet();
  //const [stateSkin, setStateSkin] = useState('');
  const {uriSkin, nameSkin, onChange} = useContext(AuthContext);

  const handleChange = (skin: Row) => {
    data.find((elem, index) => {
      if (elem.c[0].v === skin.c[0].v) {
        const newData = [...data];
        newData[index].c[4].v = true;
        setData(newData);
      }
    });
  };

  const handleChangeRemove = (skin: Row) => {
    data.find((ele, index) => {
      if (ele.c[0].v === skin.c[0].v) {
        const newData = [...data];
        newData[index].c[4].v = false;
        setData(newData);
      }
    });
  };

  const renderItem = ({item}: PropsItem) => {
    return (
      <ButtonCustom
        title={String(item.c[2].v)}
        image={String(item.c[1].v)}
        key={item.c[0].v.toString()}
        funtion={() => {
          // setStateSkin(String(item.c[3].v));
          onChange(String(item.c[3].v), String(item.c[2].v));
        }}
        iconFavorite={async () => {
          try {
            await insertSkin({
              id: Number(item.c[0].v),
              nameSkin: String(item.c[2].v),
              image: String(item.c[1].v),
              downloadImage: String(item.c[3].v),
              status: String(item.c[4].v),
            });
            handleChange(item);
            console.log('Agregado a favoritos');
          } catch (error) {
            console.log('Este skin ya se encuentra en tus favoritos', error);
          }
        }}
        icono={item.c[4].v === true ? 'heart' : 'heart-outline'}
        iconFuntionRemove={async () => {
          await deleteSkin(Number(item.c[0].v));
          handleChangeRemove(item);
        }}
      />
    );
  };

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
        <TouchableOpacity
          style={styles.Menu}
          onPress={() => navigation.navigate('FavoriteScreen')}>
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
      <SkinView alto={height} ancho={width} skin={uriSkin} name={nameSkin} />
      <FlashList
        data={data}
        renderItem={renderItem}
        keyExtractor={skin => skin.c[0].v.toString()}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        estimatedItemSize={1000}
      />
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
