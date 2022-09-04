import Admin from '@/pages/Admin';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const RouteBase = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RouteBase;
