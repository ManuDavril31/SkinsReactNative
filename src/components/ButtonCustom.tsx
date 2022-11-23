import {
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {Skins} from '../interfaces/InterfaceDataAPI';

const width = Dimensions.get('window').width - 40;

interface Props {
  title: string;
  image: string;
  icono: string;
  funtion: () => void;
  iconFunction: () => void;
  iconFuntionRemove: () => void;
}

const ButtonCustom = ({
  title,
  image,
  icono = 'heart-outline',
  funtion,
  iconFunction,
  iconFuntionRemove,
}: Props) => {
  return (
    <>
      <TouchableOpacity
        style={styles.ButtonContainer}
        activeOpacity={0.7}
        onPress={funtion}>
        <Text numberOfLines={1} style={styles.ButtonTitle}>
          {title}
        </Text>
        <Image source={{uri: image}} style={styles.ButtonImage} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.iconHeart}
        onPress={icono === 'heart-outline' ? iconFunction : iconFuntionRemove}>
        <Icon name={icono} size={25} color="#009688FF" />
      </TouchableOpacity>
    </>
  );
};

export default ButtonCustom;

const styles = StyleSheet.create({
  ButtonContainer: {
    width: width / 2,
    margin: 10,
    borderRadius: 20,
    borderWidth: 1,
    backgroundColor: '#009688FF',
  },
  ButtonImage: {
    width: '100%',
    height: 110,
    borderRadius: 20,
  },
  ButtonTitle: {
    textAlign: 'center',
    fontSize: 15,
    padding: 5,
    color: '#fff',
    fontWeight: '500',
  },
  iconHeart: {
    position: 'absolute',
    right: 15,
    bottom: 12,
  },
});
