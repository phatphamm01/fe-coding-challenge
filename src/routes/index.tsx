import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Admin from '@/pages/Admin';
import Consumer from '@/pages/Consumer';
import Home from '@/pages/Home';

const RouteBase = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/admin/:pageId" element={<Admin />} />
        <Route path="/consumer/:pageId" element={<Consumer />} />
        <Route path="/*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RouteBase;
