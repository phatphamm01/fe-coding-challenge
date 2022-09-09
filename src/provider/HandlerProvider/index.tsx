import { createContext, useContext, useEffect, useState } from 'react';

import { IChildrenProp } from '@/types/common';

import { randomId } from '@/assets/common';

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

  useEffect(() => {
    const handlerInit = new Handler({
      id: randomId(),
      ...options
    });
    setHandler(handlerInit);

    //@ts-ignore
    window.handler = handlerInit;
  }, []);

  useEffect(() => {
    console.log({ handler });

    if (!handler) return;
    const source = handler.storageHandler.get();

    if (!source) return;

    handler?.importDataStorage(source);
  }, [handler]);

  return (
    <HandlerContext.Provider value={handler}>
      {children}
    </HandlerContext.Provider>
  );
};

export default HandlerProvider;
