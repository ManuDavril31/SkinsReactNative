import React, {createContext, useState} from 'react';
import {useSpreedSheet} from '../hooks/useSpreedSheet';
import {Row} from '../interfaces/SpreedSheetApi';
import {Skins} from '../screens/FavoriteScreen';
//Definir como luce, que informacion tendre aquí
// export interface AuthState {
//   uriSkin: string;
// }

//Estado inicial
// export const initialStateContext: AuthState = {
//   uriSkin: 'https://i.postimg.cc/j5wqpNy7/Original-Steve-with-Beard.png',
// };

//definir todo lo que el contexto va a proporcionar a los hijos, lo usaremos para decirle a react cómo luce y que expone el context
export interface AuthContextProps {
  uriSkin: string;
  nameSkin: string;
  data: Row[];
  isLoading: boolean;
  focusSkin?: Skins;
  onChangeSkin: (skin: Skins) => void;
  onChange: (skin: string, name: string) => void;
  setData: (skins: Row[]) => void;
}

interface SkinsProps
  extends Omit<
    AuthContextProps,
    'onChange' | 'data' | 'isLoading' | 'setData' | 'focusSkin' | 'onChangeSkin'
  > {}

//Creamos el context
export const AuthContext = createContext({} as AuthContextProps);

//Componente que es el proveedor de el estado

/*UN REDUCER ES UNA FUNCION PURA, TODO LO QUE HACE LO DEBE SEROLVER SIN INTERACIONES EXTERNAS. */
// Componente proveedor del estado
export const AuthProvider = ({children}: any) => {
  const {data, isLoading, setData} = useSpreedSheet();
  const [focusSkin, setFocusSkin] = useState<Skins>();
  const [skinUrl, setSkinUrl] = useState<SkinsProps>({
    uriSkin: 'https://i.postimg.cc/j5wqpNy7/Original-Steve-with-Beard.png',
    nameSkin: 'STEVE',
  });
  const {uriSkin, nameSkin} = skinUrl;

  const onChange = (skin: string = uriSkin, name: string = nameSkin) => {
    setSkinUrl({uriSkin: skin, nameSkin: name});
  };

  const onChangeSkin = (skin: Skins) => {
    setFocusSkin(skin);
  };

  return (
    <AuthContext.Provider
      value={{
        uriSkin: uriSkin,
        nameSkin: nameSkin,
        data,
        onChange,
        setData,
        isLoading,
        focusSkin,
        onChangeSkin,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
