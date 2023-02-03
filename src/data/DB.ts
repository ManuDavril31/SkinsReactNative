import {
  enablePromise,
  openDatabase,
  SQLiteDatabase,
} from 'react-native-sqlite-storage';
import {Skins} from '../screens/FavoriteScreen';

// Definir nombre de la base de datos
const DATABASE_NAME = 'skins.db';
const tableName = 'skins';

//Para trabajar con promesas

enablePromise(true);

//Obtener una conexion a la base de datos
export const getDbConnection = async () => {
  const db = await openDatabase({name: DATABASE_NAME, location: 'default'});
  return db;
};

//esta funcion createTables() recibira un objeto db que crearemos y ejecutaremos la query mediante la funcion executeSql

export const createTables = async (db: SQLiteDatabase) => {
  const query = `CREATE TABLE IF NOT EXISTS ${tableName} (id INTEGER UNIQUE, nameSkin TEXT, image TEXT, downloadImage TEXT, status TEXT )`;
  await db.executeSql(query);
};

// Iniciar base de datos

export const initialDataBase = async () => {
  //obtener conexion base de datos
  const db = await getDbConnection();
  //creamos la tabla
  await createTables(db);
  //Cerrar conexion db
  db.close();
};

//Insertar skins
export const insertSkin = async ({
  id,
  nameSkin,
  image,
  downloadImage,
  status,
}: Skins) => {
  //creamos la query para insertar los datos
  const insertQuery = `INSERT INTO ${tableName} (id, nameSkin, image, downloadImage, status ) VALUES (${id}, '${nameSkin}', '${image}', '${downloadImage}', '${status}' )`;
  //Ejecutamos
  const db = await getDbConnection();
  const result = await db.executeSql(insertQuery);
  db.close();
  //Retornamos el resultado
  return result;
};

//OBTENER LISTADO DE FAVORITOS
export const getListSkins = async () => {
  const skins: Skins[] = [];
  const db = await getDbConnection();
  //Ejecutamos un select sobre la tabla skins y a continuacion cuando tenemos los resultados nos devuelve un array de resultset[]
  const result = await db.executeSql(
    `SELECT id, nameSkin, image, downloadImage, status FROM ${tableName}`,
  );
  //Iteramos sobre el array de la respuesta element
  result.forEach((element: any) => {
    for (let index = 0; index < element.rows.length; index++) {
      skins.unshift(element.rows.item(index));
    }
  });
  db.close();
  return skins;
};

// ELIMINAR SKIN DE FAVORITOS
export const deleteSkin = async (id: number) => {
  const db = await getDbConnection();
  const deleteQuery = `DELETE from ${tableName} WHERE id = ${id}`;
  await db.executeSql(deleteQuery);
  db.close();
};

//COMPROBAR SI ESTA EN LA BASE DE DATOS
export const verifySkin = async (id: number) => {
  const db = await getDbConnection();
  const verifyQuery = `SELECT id FROM ${tableName} WHERE id = ${id}`;
  const result = await db.executeSql(verifyQuery);
  if (result[0].rows.length === 0) return console.log('No esta en favoritos');
  return console.log('Ya esta en favoritos');
};
