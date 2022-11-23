import {StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

interface Props {
  left: number;
  icon: string;
  funtion?: () => void;
}

const ButtonActions = ({left, icon, funtion}: Props) => {
  return (
    <TouchableOpacity style={[styles.container, {left}]} onPress={funtion}>
      <Icon name={icon} size={40} />
    </TouchableOpacity>
  );
};

export default ButtonActions;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 10,
    position: 'absolute',
    bottom: 200,
    borderRadius: 10,
    alignItems: 'center',
  },
});
