import { createContext, useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';

import { IChildrenProp } from '@/types/common';

import { randomId } from '@/assets/common';

import { Handler } from '@/core/web/handlers';

const ProviderContainer = styled.div`
  ${tw``}
`;

const HandlerContext = createContext<Handler | null>(null);
export const useHandler = () => useContext(HandlerContext);

const Provider: React.FC<IChildrenProp> = ({ children }) => {
  const [handler, setHandler] = useState<Handler | null>(null);

  useEffect(() => {
    const handlerInit = new Handler({
      id: randomId()
    });
    setHandler(handlerInit);

    //@ts-ignore
    window.handler = handlerInit;
  }, []);

  return (
    <HandlerContext.Provider value={handler}>
      {children}
    </HandlerContext.Provider>
  );
};

export default Provider;
