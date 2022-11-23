import React, {useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  Text,
  View,
  Switch,
  Alert,
} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParams} from '../navigations/StackNavigation';
import WebView from 'react-native-webview';

import RadioButton from '../components/RadioButton';
import ButtonActions from '../components/ButtonActions';
import {saveImage} from '../funtions/saveToGallery';

interface Props extends StackScreenProps<RootStackParams, 'VisorSkinScreen'> {}

const height = Dimensions.get('window').height / 2;

const VisorSkinScreen = ({route, navigation}: Props) => {
  const params = route.params;
  const [selected, setSelected] = useState(0);
  const webRef = useRef<any>();
  //Switch
  const [isEnable, setIsEnable] = useState(false);
  const [text, setText] = useState('Girar ');

  const toggleSwitch = () => {
    if (isEnable) {
      setText('Girar ');
      webRef.current.injectJavaScript(
        `document.getElementById('rotate_animation').click();`,
      );
    } else {
      setText('No girar');
      webRef.current.injectJavaScript(
        `document.getElementById('rotate_animation').click();`,
      );
    }
    setIsEnable(previusState => !previusState);
  };

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
  };

  useEffect(() => {
    navigation.setOptions({
      title: `${params.name}`,
    });
  }, []);

  return (
    <View style={{flex: 1, marginTop: height / 15}}>
      <WebView
        ref={webRef}
        source={{uri: 'https://manudavril31.github.io/skins/'}}
        injectedJavaScript={`document.getElementById('skin_url').value = '${params.skin}'; reloadSkin();`}
        style={{marginBottom: height / 2.8}}
        startInLoadingState={true}
        renderLoading={() => (
          <ActivityIndicator size={100} color="#fff" style={styles.Loader} />
        )}
        // onLoad={() => Alert.alert('Hola')}
      />
      <View style={styles.SwitchContainer}>
        <Text style={styles.SwitchText}>{text}</Text>
        <Switch
          trackColor={{false: 'grey', true: 'tomato'}}
          thumbColor={isEnable ? 'tomato' : '#f4f3f4'}
          onValueChange={toggleSwitch}
          value={isEnable}
        />
      </View>
      <View style={styles.ContainerRadioButtons}>
        <RadioButton
          options={['Caminar', 'Correr']}
          horizontal={false}
          selected={selected}
          onChangeSelect={checkedCircle}
        />
      </View>
      <ButtonActions
        left={60}
        icon="arrow-down"
        funtion={() => saveImage(params.skin)}
      />
      <ButtonActions left={150} icon="heart" />
      <ButtonActions left={240} icon="share-social" />
    </View>
  );
};

export default VisorSkinScreen;

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
