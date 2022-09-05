import { useCallback, useState } from 'react';

export const useRerender = () => {
  const [, updateState] = useState<any>();
  const forceUpdate = useCallback(() => updateState({}), []);

  return forceUpdate;
};
