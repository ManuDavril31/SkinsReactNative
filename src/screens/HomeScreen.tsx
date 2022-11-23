import {StyleSheet, ActivityIndicator, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import ButtonCustom from '../components/ButtonCustom';
import useDataApi from '../hooks/useDataApi';
import {Skins} from '../interfaces/InterfaceDataAPI';
import {FlashList} from '@shopify/flash-list';
import {DrawerScreenProps} from '@react-navigation/drawer';
import {RootStackParams} from '../navigations/StackNavigation';
import Icon from 'react-native-vector-icons/Ionicons';
import ModalViewSkin from '../components/ModalViewSkin';
import {useSpreedSheet} from '../hooks/useSpreedSheet';

interface PropsItem {
  item: Skins;
}

interface Props extends DrawerScreenProps<RootStackParams, 'HomeScreen'> {}

const HomeScreen = ({navigation}: Props) => {
  const {setData, data, isLoading} = useDataApi();
  const [visible, setVisible] = useState(false);
  const [item, setItem] = useState('');

  ///
  const {datas} = useSpreedSheet();
  const handleChange = (item: Skins) => {
    data.find((elem, index) => {
      if (elem.ID === item.ID) {
        const newData = [...data];
        newData[index].STATUS = true;
        setData(newData);
      }
    });
  };

  const handleChangeRemove = (item: Skins) => {
    data.find((ele, index) => {
      if (ele.ID === item.ID) {
        const newData = [...data];
        newData[index].STATUS = false;
        setData(newData);
      }
    });
  };

  const renderItem = ({item}: PropsItem) => {
    return (
      <ButtonCustom
        title={item.TITULOS}
        image={item.IMAGENES}
        key={item.ID}
        funtion={() => {
          // navigation.navigate('VisorSkinScreen', {
          //   skin: item.DESCARGAR,
          //   name: item.TITULOS,
          // });
          setItem(item.DESCARGAR);
          setVisible(true);
        }}
        iconFunction={() => handleChange(item)}
        icono={item.STATUS === true ? 'heart' : 'heart-outline'}
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
        keyExtractor={item => item.ID.toString()}
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
