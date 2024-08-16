import { Routes, Route } from 'react-router-dom';
import Stores from '../../pages/store';
import StoreDetail from '../../pages/store/detail';

function StoreRoute() {
  return (
    <Routes>
      <Route path="" element={<Stores />} />
      <Route path=":id" element={<StoreDetail />} />
    </Routes>
  );
}

export default StoreRoute;
