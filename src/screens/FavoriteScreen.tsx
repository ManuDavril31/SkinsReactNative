import React from 'react';
import {Recicler} from '../components/Recicler';

export interface DataSkins {
  id: number;
  IMAGENES: string;
  TITULOS: string;
  DESCARGAR: string;
  STATUS: boolean;
}
const favorites: DataSkins[] = [
  {
    id: 191,
    IMAGENES: 'https://i.postimg.cc/9FntqPc9/cyrus.jpg',
    TITULOS: 'CYRUS',
    DESCARGAR: 'https://i.postimg.cc/kgFnVsmM/cyrus.png',
    STATUS: true,
  },
];

export const FavoriteScreen = () => {
  return <Recicler data={favorites} />;
};
