import { IChildrenProp } from '@/types/common';

import ConsumerPage from '@/containers/Consumer';

import HandlerProvider from '@/provider/HandlerProvider';

const Consumer: React.FC<IChildrenProp> = () => {
  return (
    <HandlerProvider>
      <ConsumerPage />
    </HandlerProvider>
  );
};

export default Consumer;
