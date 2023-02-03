import {ActivityIndicator, Dimensions} from 'react-native';
import React, {useContext} from 'react';
import ButtonCustom from './ButtonCustom';
import {FlashList} from '@shopify/flash-list';
import {Row} from '../interfaces/SpreedSheetApi';
import {SkinView} from './visorScreen/SkinView';
import {AuthContext} from '../context/AuthContext';

interface Props {
  data: Row[];
  isLoading: boolean;
  // setData: (skin: Row[]) => void;
  onFavorite: (skin: Row) => void;
  onRemove: (skin: Row) => void;
}

interface PropsItem {
  item: Row;
}

const height = Dimensions.get('window').height / 2 - 50;
const width = Dimensions.get('window').width; // - 55

export const Recicler = ({data, isLoading, onFavorite, onRemove}: Props) => {
  //const [stateSkin, setStateSkin] = useState('');
  const {uriSkin, nameSkin, onChange} = useContext(AuthContext);

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
  //   });
  // };

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
        iconFunction={() => onFavorite(item)}
        icono={item.c[4].v === true ? 'heart' : 'heart-outline'}
        iconFuntionRemove={() => onRemove(item)}
      />
    );
  };

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
