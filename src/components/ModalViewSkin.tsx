import {
  Modal,
  Text,
  View,
  ActivityIndicator,
  Switch,
  StyleSheet,
  Dimensions,
  Button,
  Alert,
} from 'react-native';
import React, {useEffect, useRef} from 'react';
import WebView from 'react-native-webview';
import RadioButton from './RadioButton';
import ButtonActions from './ButtonActions';
import {MinecraftSkinViewer} from '@wiicamp/react-minecraft-skin-viewer';
import Canvas from 'react-native-canvas';
import ReactSkinview3d from 'react-skinview3d';

const height = Dimensions.get('window').height / 2;

interface Props {
  IsVisible: boolean;
  skin: string;
  setVisibleModal: () => void;
}

const ModalViewSkin = ({IsVisible, skin, setVisibleModal}: Props) => {
  const ref = useRef<any>();

  useEffect(() => {
    if (ref.current) {
      const ctx = ref.current.getContext('2d');

      if (ctx) {
        const text = () => {
          if (ref.current) {
            const ctx = ref.current.getContext('2d');
            ctx.beginPath();
            ctx.arc(100, 100, 40, 0, 2 * Math.PI);
            ctx.closePath();
            ctx.fillStyle = 'red';
            ctx.fill();
          }
          // <MinecraftSkinViewer
          //   skin={skin}
          //   width={320}
          //   height={480}
          //   background="red"
          // />
        };
        text();
      }
    }
    //     <MinecraftSkinViewer
    //     skin={skin}
    //     width={320}
    //     height={480}
    //     background="red"
    //   />
  }, [skin]);

  return (
    <Modal visible={IsVisible} animationType="slide">
      <Button title="Cerrar modal" onPress={setVisibleModal} />
      <Canvas
        baseUrl={skin}
        ref={ref}
        style={{width: '100%', height: '100%', backgroundColor: '#000'}}
      />
    </Modal>
  );
};

export default ModalViewSkin;

const styles = StyleSheet.create({
  ContainerText: {
    fontSize: 20,
    textAlign: 'center',
    margin: 5,
    color: '#fff',
    fontWeight: '500',
  },
  ContainerRadioButtons: {
    position: 'absolute',
    left: 40,
    bottom: 300,
  },
  Loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  SwitchContainer: {
    flexDirection: 'row',
    position: 'absolute',
    right: 30,
    top: 5,
  },
  SwitchText: {
    fontSize: 20,
    textAlign: 'center',
  },
});

// handleCanvas = (canvas) => {
//     const ctx = canvas.getContext('2d');
//     ctx.fillStyle = 'purple';
//     ctx.fillRect(0, 0, 100, 100);
//   }

//   render() {
//     return (
//       <Canvas ref={this.handleCanvas}/>
//     )
//   }
// }
