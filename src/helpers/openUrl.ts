import {Alert, Linking} from 'react-native';
import Share from 'react-native-share';

export const openUrl = async (url: string) => {
  const isSuport = await Linking.canOpenURL(url);
  if (isSuport) {
    await Linking.openURL(url);
  } else {
    Alert.alert(`Problemas al ingresar a está url: ${url}`);
  }
};

export const URL =
  'https://play.google.com/store/apps/details?id=skins.minecraft.pe';

export const shareSkin = async (msg: string, url: string) => {
  const shareOptions = {
    message: `Encuentra más skins en la siguiente app ${URL}\n Nombre Skin:\n ${msg},\n Link Skin: `,
    url,
  };
  try {
    const shareResponse = await Share.open(shareOptions);
    console.log(shareResponse);
  } catch (error) {
    console.log(`Error ---> ${error}`);
  }
};
