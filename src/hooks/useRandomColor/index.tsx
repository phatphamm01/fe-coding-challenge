import { useState } from 'react';

import { IRBG, randomRBGColor } from '@/assets/common';

const useRandomColor = () => {
  const randomColor = (): IRBG => {
    const color = randomRBGColor();

    if (!color) {
      return randomColor();
    }

    return color;
  };
  const [color] = useState<IRBG>(randomColor());

  return color;
};

export default useRandomColor;
