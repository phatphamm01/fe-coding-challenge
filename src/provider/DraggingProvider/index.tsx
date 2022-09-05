import { createContext, useContext, useReducer } from 'react';

import { IChildrenProp } from '@/types/common';

type InitialStateType = {
  name: string;
};

const initialState: InitialStateType = {
  name: ''
};

export const reducer = (state: any, action: any) => {
  switch (action.type) {
    case 'CHANGE_NAME':
      return {
        ...state,
        name: action.data
      };
  }
};

const HandlerContext = createContext<{
  state: InitialStateType;
  dispatch: React.Dispatch<any>;
}>({
  state: initialState,
  dispatch: () => null
});

export const useDraggingHandler = () => useContext(HandlerContext);

const DraggingProvider: React.FC<IChildrenProp> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <HandlerContext.Provider value={{ state, dispatch }}>
      {children}
    </HandlerContext.Provider>
  );
};

export default DraggingProvider;
