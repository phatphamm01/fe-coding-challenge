import { useEffect, useState } from 'react';

import fetchWebPage from '@/services/webPage';

export const useGetAllWebPage = () => {
  const [data, setData] = useState<{ _id: string; json: string }[]>([]);
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
    const result = await fetchWebPage.getAll();
    setLoading(false);

    if (!result) return;
    if (!result.data) return;

    setData(result.data);
  };

  return { data, loading, fetchData } as const;
};
