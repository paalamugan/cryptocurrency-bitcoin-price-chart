import axios, { AxiosRequestConfig } from 'axios';
import { useEffect, useState } from 'react';

const useAxios = <TResponse>(config: AxiosRequestConfig & string) => {
  const [data, setData] = useState<TResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  axios.defaults.baseURL = 'https://api.coingecko.com/api/v3';

  const fetchData = async (params: AxiosRequestConfig & string) => {
    try {
      setLoading(true);
      const result = await axios(params);
      setData(result.data);
    } catch (err) {
      setError((err as Error).message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(config);
  }, [config]);

  return {
    data,
    loading,
    error,
    refetch: () => fetchData(config),
  };
};

export default useAxios;
