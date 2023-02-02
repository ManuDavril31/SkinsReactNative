/* eslint-disable prettier/prettier */
import {Modal, Button} from 'react-native';
import React from 'react';

import {SkinView} from './visorScreen/SkinView';

//const height = Dimensions.get('window').height / 2;

interface Props {
  IsVisible: boolean;
  skin: string;
  setVisibleModal: () => void;
}

const ModalViewSkin = React.memo(({IsVisible, setVisibleModal}: Props) => {
  console.log('ModalViewSkins');
  return (
    <Modal visible={IsVisible} animationType="fade">
      <Button title="Cerrar modal" onPress={setVisibleModal} />
      <SkinView />
    </Modal>
  );
});

export default ModalViewSkin;

// const styles = StyleSheet.create({
//   ContainerText: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 5,
//     color: '#fff',
//     fontWeight: '500',
//   },
//   ContainerRadioButtons: {
//     position: 'absolute',
//     left: 40,
//     bottom: 300,
//   },
//   Loader: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   SwitchContainer: {
//     flexDirection: 'row',
//     position: 'absolute',
//     right: 30,
//     top: 5,
//   },
//   SwitchText: {
//     fontSize: 20,
//     textAlign: 'center',
//   },
// });
