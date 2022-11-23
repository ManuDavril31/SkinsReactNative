import {Row} from '../interfaces/SpreedSheetApi';
import {useState, useEffect} from 'react';

const sheet = 'https://docs.google.com/spreadsheets/d/';
const ssid = '1ewIA2E3E0QZVBvVlWR3bdq7D3kqev3EquCJY5QuXZr4';
const complement = '/gviz/tq?tqx=out:json';

export const useSpreedSheet = () => {
  const [datas, setDatas] = useState<Row[]>([]);

  const fetchApi = async () => {
    const res = await fetch(`${sheet}${ssid}${complement}`);
    const text = await res.text();
    const transformJSON = JSON.parse(text.substring(47).slice(0, -2));
    setDatas(transformJSON.table.rows);
  };

  useEffect(() => {
    fetchApi();
  }, []);

  return {datas};
};
