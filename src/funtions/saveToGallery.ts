import * as MediaLibrary from 'expo-media-library';
import {Alert, PermissionsAndroid} from 'react-native';
import * as FileSystem from 'expo-file-system';

const fileUri: string = `${FileSystem.documentDirectory}/Skins/`;
const skinFileUri = (skin: string): string => fileUri + `${skin}`.slice(20, 25);

// //guardar en galeria
// export const saveToGallery = async (uris: any) => {};

// //permisos
const requestPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: 'Necesitamos tu permiso',
        message:
          'Por favor, permítanos guardar las fotos en la' +
          "carpeta 'elenas' en tu aplicación de fotos",
        buttonNeutral: 'Pregúntame más tarde.',
        buttonNegative: 'No',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    } else {
      console.error('Camera permission denied');
      return false;
    }
  } catch (err) {
    console.error(err);
    return false;
  }
};

const ensureDirExists = async () => {
  const dirInfo = await FileSystem.getInfoAsync(fileUri);
  if (!dirInfo.exists) {
    console.error("Directory doesn't exist, creating...");
    await FileSystem.makeDirectoryAsync(fileUri, {
      intermediates: true,
    });
  }
};

// const extractExtension = (filename: string): string => {
//   const extensions = /[^.]+$/.exec(filename);
//   return extensions ? extensions[0] : '';
// };

// export const saveImageToGallery = async (file: string) => {
//   try {
//     const granted = await requestPermission();
//     if (!granted) {
//       Alert.alert('Permiso denegados');
//     }
//     const extension = extractExtension(file);
//     const download = await FileSystem.downloadAsync(
//       file,
//       skinFileUri(file, extension),
//     );
//     await saveToGallery(download);
//     console.log(download);
//     return download;
//   } catch (error) {
//     console.log(error);
//   }
// };

export const saveImageToGallery = async (file: string) => {
  requestPermission();
  try {
    const asset = await MediaLibrary.createAssetAsync(file);
    const album = await MediaLibrary.getAlbumAsync('skinss');
    // if (album == null) {
    //     await MediaLibrary.createAlbumAsync('skinss', asset, false);
    // } else {
    //     await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
    // }
    await MediaLibrary.createAlbumAsync('skinss', asset, false);
    await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
  } catch (e) {
    console.log(e);
  }
};

export const saveImage = async (uri: string) => {
  try {
    ensureDirExists();
    // Request device storage access permission
    const {status} = await MediaLibrary.requestPermissionsAsync();
    if (status === 'granted') {
      //   Save image to media library
      const downloaded = await FileSystem.downloadAsync(uri, skinFileUri(uri));
      console.log(downloaded.uri);
      //   await MediaLibrary.saveToLibraryAsync(downloaded.uri);
      //   saveImageToGallery(downloaded.uri);
      console.log('Image successfully saved');
    }
  } catch (error) {
    console.log('Hola:' + error);
  }
};
