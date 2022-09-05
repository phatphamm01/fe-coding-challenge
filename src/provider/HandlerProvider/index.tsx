import { createContext, useContext, useEffect, useState } from 'react';

import { IChildrenProp } from '@/types/common';

import { randomId } from '@/assets/common';

import { Handler } from '@/core/web/handlers';

const HandlerContext = createContext<Handler | null>(null);
export const useHandler = () => useContext(HandlerContext);

const HandlerProvider: React.FC<IChildrenProp> = ({ children }) => {
  const [handler, setHandler] = useState<Handler | null>(null);

  useEffect(() => {
    const handlerInit = new Handler({
      id: randomId()
    });
    setHandler(handlerInit);

    //@ts-ignore
    window.handler = handlerInit;
  }, []);

  useEffect(() => {
    if (!handler) return;
    const source = handler.storageHandler.getAsMap();
    if (!source) return;

    handler?.setObjects(source);
  }, [handler]);

  return (
    <HandlerContext.Provider value={handler}>
      {children}
    </HandlerContext.Provider>
  );
};

export default HandlerProvider;
