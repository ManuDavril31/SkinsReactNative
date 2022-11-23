import {StyleSheet, ActivityIndicator, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import ButtonCustom from '../components/ButtonCustom';
import {FlashList} from '@shopify/flash-list';
import {DrawerScreenProps} from '@react-navigation/drawer';
import {RootStackParams} from '../navigations/StackNavigation';
import Icon from 'react-native-vector-icons/Ionicons';
import ModalViewSkin from '../components/ModalViewSkin';
import {useSpreedSheet} from '../hooks/useSpreedSheet';
import {Row} from '../interfaces/SpreedSheetApi';

interface PropsItem {
  item: Row;
}

interface Props extends DrawerScreenProps<RootStackParams, 'HomeScreen'> {}

const HomeScreen = ({navigation}: Props) => {
  const {data, setData, isLoading} = useSpreedSheet();
  const [visible, setVisible] = useState(false);
  const [item, setItem] = useState('');

  const handleChange = (item: Row) => {
    data.find((elem, index) => {
      if (elem.c[0].v === item.c[0].v) {
        const newData = [...data];
        newData[index].c[4].v = true;
        setData(newData);
      }
    });
  };

  const handleChangeRemove = (item: Row) => {
    data.find((ele, index) => {
      if (ele.c[0].v === item.c[0].v) {
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
          navigation.navigate('VisorSkinScreen', {
            skin: String(item.c[3].v),
            name: String(item.c[2].v),
          });
          // setItem(String(item.c[3].v));
          // setVisible(true);
        }}
        iconFunction={() => handleChange(item)}
        icono={item.c[4].v === true ? 'heart' : 'heart-outline'}
        iconFuntionRemove={() => handleChangeRemove(item)}
      />
    );
  };

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity style={styles.Menu} onPress={navigation.toggleDrawer}>
          <Icon name="menu-outline" size={30} color="#fff" />
        </TouchableOpacity>
      ),
      title: 'Skins Minecraft',
    });
  }, []);

  if (isLoading) {
    return <ActivityIndicator size={100} color="#FFF" />;
  }

  return (
    <>
      <FlashList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.c[0].v.toString()}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        estimatedItemSize={1000}
      />
      <ModalViewSkin
        IsVisible={visible}
        skin={item}
        setVisibleModal={() => setVisible(false)}
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
