import {useEffect, useState} from 'react';
import {Skins} from '../interfaces/InterfaceDataAPI';

const useDataApi = () => {
  const [data, setData] = useState<Skins[]>([]);
  const [isLoading, setisLoading] = useState(true);

  const fetchApi = async () => {
    const res = await fetch(
      'https://script.google.com/macros/s/AKfycbwtkuS_Es_MGF7VvfOnWsQ8hmCgBm49fIuQeW0JhoMgf6rnlzC4FKWO3zoIlGFSTkEU/exec',
    );
    const resJSON = await res.json();
    setData(resJSON.data);
    setisLoading(false);
  };

  useEffect(() => {
    fetchApi();
  }, []);

  return {
    data,
    isLoading,
    setData,
  };
};

export default useDataApi;
