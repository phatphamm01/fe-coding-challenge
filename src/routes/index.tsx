import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Admin from '@/pages/Admin';
import Consumer from '@/pages/Consumer';

const RouteBase = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Admin />} />
        <Route path="/consumer" element={<Consumer />} />
        <Route path="/*" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RouteBase;
