import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { useEffect, useState } from 'react';

axios.defaults.baseURL = 'https://api.coingecko.com/api/v3';

const useAxios = <TResponse>(config: AxiosRequestConfig & string) => {
  const [data, setData] = useState<TResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<AxiosError | null>(null);
  const [isFetching, setIsFetching] = useState(false);

  const fetchData = async (params: AxiosRequestConfig & string) => {
    try {
      setError(null);
      setIsFetching(true);
      const result = await axios(params);
      setData(result.data);
    } catch (err) {
      setError(err as AxiosError);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    let isMounted = true;
    (async () => {
      if (!isMounted) return;
      setIsLoading(true);
      await fetchData(config);
      setIsLoading(false);
    })();
    return () => {
      isMounted = false;
    };
  }, [config]);

  return {
    data,
    isLoading,
    isFetching,
    error,
    refetch: (updateConfig = config) => fetchData(updateConfig),
  };
};

export default useAxios;
