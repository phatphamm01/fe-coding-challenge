import { useEffect, useState } from 'react';

const usePositionMouse = () => {
  const [position, setPosition] = useState<number[]>([0, 0]);

  useEffect(() => {
    const handleChangePosition = function (e: MouseEvent) {
      const x = e.clientX;
      const y = e.clientY;

      setPosition([x, y]);
    };

    document.addEventListener('mousemove', handleChangePosition);
    return () => {
      document.removeEventListener('mousemove', handleChangePosition);
    };
  }, []);

  return position;
};

export default usePositionMouse;
