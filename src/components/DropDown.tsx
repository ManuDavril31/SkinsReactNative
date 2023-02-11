/* eslint-disable curly */
import React from 'react';
import {MenuView} from '@react-native-menu/menu';
import {TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Row} from '../interfaces/SpreedSheetApi';
import {useToast} from 'react-native-toast-notifications';
import {insertSkin} from '../data/DB';
import {shareSkin} from '../helpers/openUrl';
import {reportSkinFailed} from '../helpers/reportSkinFailed';

// const elements = [
//   {value: 'fav', text: 'Add favorite'},
//   {value: 'Share', text: 'Share skin'},
//   {value: 'Report', text: 'Report skin failed'},
// ];

interface Props {
  skin: Row;
}

export const DropDown = ({skin}: Props) => {
  // const [items, setItemss] = useState([]);
  const {show} = useToast();

  const addSkinFavorite = async (item: Row) => {
    try {
      await insertSkin({
        id: Number(item.c[0].v),
        nameSkin: String(item.c[2].v),
        image: String(item.c[1].v),
        downloadImage: String(item.c[3].v),
        status: String(item.c[4].v),
      });
      // handleChange(item);
      show('Agregado a favoritos correctamente', {
        type: 'success',
        duration: 2000,
      });
    } catch (error) {
      show('Este skin ya se encuentra en tus favoritos', {
        type: 'danger',
        duration: 2000,
      });
      console.log('Este skin ya se encuentra en tus favoritos', error);
    }
  };

  return (
    <View>
      <MenuView
        onPressAction={async ({nativeEvent}) => {
          console.log(nativeEvent);
          if (nativeEvent.event === 'fav') return await addSkinFavorite(skin);
          if (nativeEvent.event === 'share')
            return await shareSkin(String(skin.c[2].v), String(skin.c[3].v));
          if (nativeEvent.event === 'Report')
            await reportSkinFailed(
              'Reportar skin que no se carga',
              `Para reportar la siguiente Skin:\n ${String(
                skin.c[2].v,
              )},\n Link Skin: ${String(skin.c[3].v)}`,
              () =>
                show(
                  'Problemas al cargar la ventana, intenta ver si tienes algun servidor de correo instalado o instala uno desde tu tienda de aplicaciones.',
                  {type: 'danger'},
                ),
            );
        }}
        actions={[
          {id: 'fav', title: 'Favorite'},
          {id: 'share', title: 'Share'},
          {id: 'Report', title: 'Report skin failed'},
        ]}>
        <TouchableOpacity>
          <Icon name="ellipsis-vertical-outline" size={30} />
        </TouchableOpacity>
      </MenuView>
    </View>
  );
};
