/* eslint-disable quotes */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useRef, useState} from 'react';
import {Button, StyleSheet, TouchableOpacity, Text} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import WebView from 'react-native-webview';
import RadioButton from '../RadioButton';

interface Props {
  ancho: number;
  alto: number;
  skin: string;
  name: string;
}

export const SkinView = ({alto, ancho, skin, name}: Props) => {
  const [selected, setSelected] = useState(0);
  const webRef = useRef<any>();
  const canvas = `document.querySelector('canvas').style.height = '${alto}px'; document.querySelector('canvas').style.width = '${ancho}px';`;

  const checkedCircle = (i: number) => {
    setSelected(i);
    if (i === 0) {
      webRef.current.injectJavaScript(
        `document.getElementById('primary_animation_walk').click();`,
      );
    }
    if (i === 1) {
      webRef.current.injectJavaScript(
        `document.getElementById('primary_animation_run').click();`,
      );
    }
    if (i === 2) {
      webRef.current.injectJavaScript(
        `document.getElementById('primary_animation_fly').click();`,
      );
    }
  };

  const onTurn = () => {
    webRef.current.injectJavaScript(
      `document.getElementById('rotate_animation').click();`,
    );
  };

  const upLoadSkinDevice = () => {
    webRef.current.injectJavaScript(
      `document.getElementById('skin_url_upload').click();`,
    );
  };

  const onResetSkin = () => {
    webRef.current.injectJavaScript(
      `document.getElementById('skin_url').value = '${skin}'; reloadSkin(); document.getElementById('nametag_text').value = 'Steve'; reloadNameTag();`,
    );
  };

  const onResetAll = () => {
    webRef.current.injectJavaScript(
      `document.getElementById('skin_url_unset').click(); reloadSkin();`,
    );
  };

  useEffect(() => {
    onResetSkin();
  }, [skin]);

  return (
    <>
      <Text style={styles.nameSkin}>{name}</Text>
      <RadioButton
        options={['Walk', 'Run', 'Fly']}
        horizontal={false}
        selected={selected}
        onChangeSelect={checkedCircle}
        position
      />
      <TouchableOpacity onPress={onTurn} style={styles.iconTurn}>
        <Icon name="sync-outline" size={30} color="#fff" />
      </TouchableOpacity>
      <TouchableOpacity onPress={upLoadSkinDevice} style={styles.iconUpload}>
        <Icon name="cloud-upload-outline" size={30} color="#fff" />
      </TouchableOpacity>
      <WebView
        ref={webRef}
        source={{uri: 'https://manudavril31.github.io/skins/'}}
        startInLoadingState={true}
        injectedJavaScript={`${canvas}; document.getElementById('skin_url').value = 'https://i.postimg.cc/j5wqpNy7/Original-Steve-with-Beard.png'; reloadSkin();`}
      />
      <Button title="Reset" onPress={onResetAll} />
    </>
  );
};

const styles = StyleSheet.create({
  iconTurn: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 2,
  },
  iconUpload: {
    position: 'absolute',
    top: 50,
    right: 10,
    zIndex: 1,
  },
  nameSkin: {
    position: 'absolute',
    left: '50%',
    transform: [{translateX: -50}],
    zIndex: 1,
  },
});
