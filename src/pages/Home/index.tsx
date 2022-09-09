import { IChildrenProp } from '@/types/common';

import HomePage from '@/containers/Home';

interface IHome {}

const Home: React.FC<IChildrenProp & IHome> = () => {
  return <HomePage />;
};

export default Home;
