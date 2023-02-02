/* eslint-disable prettier/prettier */
import {Alert, PermissionsAndroid} from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';

// interface File {
//   url: string;
//   title?: string;
// }

//overmind/effects/sharing/index.ts

const popularSkinsDir: string = `${FileSystem.documentDirectory}/Skins/`;
const skinFileUri = (id: string, extension: string): string =>
  popularSkinsDir + `Skins_${id}.${extension}`;

// Checks if directory exists. If not, creates it
async function ensureDirExists() {
  const dirInfo = await FileSystem.getInfoAsync(popularSkinsDir);
  if (!dirInfo.exists) {
    console.error("Directory doesn't exist, creating...");
    await FileSystem.makeDirectoryAsync(popularSkinsDir, {intermediates: true});
  }
}

// Save file to gallery (Important: Previously validate permissions)
export const saveToGallery = async (files: string[]) => {
  try {
    const result = await Promise.all(
      files.map(async file => {
        console.log(file);
        const asset = await MediaLibrary.createAssetAsync(file);
        return asset;
      }),
    );
    const album = await MediaLibrary.getAlbumAsync('Skins');
    if (album === null) {
      if (result.length > 1) {
        const newAlbum = await MediaLibrary.createAlbumAsync(
          'Skins',
          result[0],
          false,
        );
        await MediaLibrary.addAssetsToAlbumAsync(
          result.slice(1),
          newAlbum,
          false,
        );
      } else if (result.length === 1) {
        await MediaLibrary.createAlbumAsync('Skins', result[0], false);
      }
    } else {
      await MediaLibrary.addAssetsToAlbumAsync(result, album, false);
    }
    return true;
  } catch (err) {
    console.error('ERROR: savaFileAsync', err);
  }
};

// //permisos

const requestPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: 'Necesitamos tu permiso',
        message:
          'Por favor, permítanos guardar las fotos en la' +
          "carpeta 'Skins' en tu aplicación de fotos",
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

const extractExtension = (filename: string): string => {
  const extensions = /[^.]+$/.exec(filename);
  return extensions ? extensions[0] : '';
};

export const saveUrlToCameraRoll = async (files: string[]) => {
  try {
    await ensureDirExists();
    const granted = await requestPermission();
    if (!granted) {
      Alert.alert('Permisos denegados');
      return false;
    }
    const results = await Promise.all(
      files.map(async file => {
        const id = `${
          Math.floor(new Date().getTime() + new Date().getSeconds() / 2) +
          Math.round(Math.random() * 10) +
          Math.round(Math.random() * 100) +
          Math.round(Math.random() * 1000)
        }`;
        const extension = extractExtension(file);
        try {
          const downloaded = await FileSystem.downloadAsync(
            file,
            skinFileUri(id, extension),
          );
          return downloaded.uri;
        } catch (error) {
          console.log(error, 'FileSystem.downloadAsync');
          return '';
        }
      }),
    );
    await saveToGallery(results);
    return true;
  } catch (error) {
    console.log(error, 'saveUrlsToCameraRoll');
  }
};
