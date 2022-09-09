import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { IChildrenProp } from '@/types/common';

import fetchWebPage from '@/services/webPage';

import { Handler, HandlerOptions } from '@/core/web/handlers';

const HandlerContext = createContext<Handler | null>(null);
export const useHandler = () => useContext(HandlerContext);

interface IHandlerProvider {
  options?: Partial<HandlerOptions>;
}

const HandlerProvider: React.FC<IChildrenProp & IHandlerProvider> = ({
  children,
  options
}) => {
  const [handler, setHandler] = useState<Handler | null>(null);
  const { pageId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    handleGetDataAPI();
    console.log('test');

    return () => {
      handler?.destroy();
    };
  }, [pageId]);

  const handleGetDataAPI = async () => {
    if (!pageId) return;

    const page = await fetchWebPage.getWebPageById({ _id: pageId });

    if (!page || !page?.data?._id) {
      navigate('/');
      return;
    }

    const handlerInit = new Handler({
      id: page.data._id,
      ...options
    });

    setHandler(handlerInit);

    handlerInit.importJsonToApi(JSON.parse(page.data.json || '[]') as any);

    //@ts-ignore
    window.handler = handlerInit;
  };

  return (
    <HandlerContext.Provider value={handler}>
      {children}
    </HandlerContext.Provider>
  );
};

export default HandlerProvider;
