// import {Dimensions} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import ButtonCustom from '../components/ButtonCustom';
import {FlashList} from '@shopify/flash-list';
import {SkinView} from '../components/visorScreen/SkinView';
import {deleteSkin, getListSkins} from '../data/DB';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParams} from '../navigations/StackNavigation';
import {Dimensions} from 'react-native';
import {AuthContext} from '../context/AuthContext';

interface PropsItem {
  item: Skins;
}

export interface Skins {
  id: number;
  nameSkin: string;
  image: string;
  downloadImage: string;
  status: string;
}

interface Props extends StackScreenProps<RootStackParams, 'HomeScreen'> {}

const height = Dimensions.get('window').height / 2 - 50;
const width = Dimensions.get('window').width; // - 55

const FavoriteScreen = ({navigation}: Props) => {
  const [data, setData] = useState<Skins[]>([]);
  const {uriSkin, nameSkin} = useContext(AuthContext);

  // const handleChange = (skin: Row) => {
  //   data.find((elem, index) => {
  //     if (elem.c[0].v === skin.c[0].v) {
  //       const newData = [...data];
  //       newData[index].c[4].v = true;
  //       setData(newData);
  //     }
  //   });
  // };

  // const handleChangeRemove = (skin: Row) => {
  //   data.find((ele, index) => {
  //     if (ele.c[0].v === skin.c[0].v) {
  //       const newData = [...data];
  //       newData[index].c[4].v = false;
  //       setData(newData);
  //     }
  //   });g
  // };

  useEffect(() => {
    const fetcDB = async () => {
      const getSkinsDB = await getListSkins();
      setData(getSkinsDB);
    };
    fetcDB();
  }, []);

  const renderItem = ({item}: PropsItem) => {
    return (
      <ButtonCustom
        title={item.nameSkin}
        image={item.image}
        key={item.id}
        funtion={() => {
          // setStateSkin(String(item.c[3].v));
          //onChange(String(item.c[3].v), String(item.c[2].v));
        }}
        iconFavorite={() => {}}
        icono={'trash-outline'}
        iconFuntionRemove={() => {
          deleteSkin(item.id);
          navigation.navigate('HomeScreen');
        }}
      />
    );
  };

  // const renderIconsMenu = () => {
  //   return (
  //     <View style={{flexDirection: 'row'}}>
  //       <TouchableOpacity
  //         style={styles.Menu}
  //         onPress={() => {
  //           saveUrlToCameraRoll(['']);
  //         }}>
  //         <Icon name="cloud-download-outline" size={30} color="#fff" />
  //       </TouchableOpacity>
  //       <TouchableOpacity style={styles.Menu} onPress={navigation.toggleDrawer}>
  //         <Icon name="heart-outline" size={30} color="#fff" />
  //       </TouchableOpacity>
  //       <TouchableOpacity style={styles.Menu} onPress={navigation.toggleDrawer}>
  //         <Icon name="share-social-outline" size={30} color="#fff" />
  //       </TouchableOpacity>
  //       <TouchableOpacity style={styles.Menu} onPress={navigation.toggleDrawer}>
  //         <Icon name="star-outline" size={30} color="#fff" />
  //       </TouchableOpacity>
  //     </View>
  //   );
  // };

  // useEffect(() => {
  //   navigation.setOptions({
  //     headerLeft: () => (
  //       <TouchableOpacity style={styles.Menu} onPress={navigation.toggleDrawer}>
  //         <Icon name="menu-outline" size={30} color="#fff" />
  //       </TouchableOpacity>
  //     ),
  //     // title: `${nameSkin}`,
  //     headerRight: () => renderIconsMenu(),
  //   });
  // }, [uriSkin]);

  //  if (isLoading) {
  //     return <ActivityIndicator size={100} color="#FFF" />;
  //   }

  return (
    <>
      <SkinView alto={height} ancho={width} skin={uriSkin} name={nameSkin} />
      <FlashList
        data={data}
        renderItem={renderItem}
        keyExtractor={skin => skin.id.toString()}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        estimatedItemSize={1000}
      />
    </>
  );
};

export default FavoriteScreen;

// const styles = StyleSheet.create({
//   HomeContainer: {
//     // flex: 1,
//     // flexDirection: 'row',
//     // flexWrap: 'wrap',
//   },
//   Menu: {
//     marginLeft: 20,
//     marginRight: 10,
//   },
// });
// //
