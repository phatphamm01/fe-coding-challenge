import { useEffect, useState } from 'react';

import fetchWebPage from '@/services/webPage';

export const useGetWebPage = (id: string) => {
  const [data, setData] = useState<{ _id: string; json: string }>({
    _id: '',
    json: ''
  });
  const [loading, setLoading] = useState(false);
  const [fetch, setFetch] = useState(0);

  useEffect(() => {
    invokeGetAllWebPage();
  }, [fetch]);

  const fetchData = () => {
    setFetch((value) => value + 1);
  };

  const invokeGetAllWebPage = async () => {
    setLoading(true);
    const result = await fetchWebPage.getWebPageById({ _id: id });
    setLoading(false);

    if (!result) return;
    if (!result.data) return;

    setData(result.data);
  };

  return { data, loading, fetchData } as const;
};

export default useGetWebPage;
