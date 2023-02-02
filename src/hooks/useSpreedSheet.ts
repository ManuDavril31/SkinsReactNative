/* eslint-disable prettier/prettier */
import {useState, useEffect} from 'react';
import {Alert} from 'react-native';
import {Row} from '../interfaces/SpreedSheetApi';

const sheet = 'https://docs.google.com/spreadsheets/d/';
const ssid = '1ewIA2E3E0QZVBvVlWR3bdq7D3kqev3EquCJY5QuXZr4';
const complement = '/gviz/tq?tqx=out:json';

export const useSpreedSheet = () => {
  console.log('useSpreedSheet');
  const [data, setData] = useState<Row[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchApi = async () => {
    try {
      const res = await fetch(`${sheet}${ssid}${complement}`);
      const text = await res.text();
      const transformJSON = JSON.parse(text.substring(47).slice(0, -2));
      setData(transformJSON.table.rows);
      console.log(JSON.stringify(transformJSON.table.rows));
      setIsLoading(false);
    } catch (error) {
      Alert.alert(
        'Error',
        `Ha ocurrido un error, favor verifique su conexión a internet o intente más tarde \n ${error}`,
      );
    }
  };

  useEffect(() => {
    console.log('useSpreedSheet useEffect');
    fetchApi();
  }, []);

  return {data, setData, isLoading};
};
