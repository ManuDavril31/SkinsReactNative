import {Linking} from 'react-native';

//FUNCION PARA REPORTAR ENLACES
export const reportSkinFailed = async (
  asunto: string,
  message: string,
  show: Function,
) => {
  const isSupported = await Linking.canOpenURL(
    `mailto:manumar451@gmail.com?subject=${asunto}&body=${message}`,
  );
  if (isSupported) {
    await Linking.openURL(
      `mailto:manumar451@gmail.com?subject=${asunto}&body=${message}`,
    );
  } else {
    show();
  }
};
