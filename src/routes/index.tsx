import { Route, Routes } from 'react-router-dom';
import StoreRoute from './storeRoute';
import LoginPage from '../pages/login';
import AdminLayout from '../component/layout/Layout';
import 'bootstrap/dist/css/bootstrap.min.css';
import CategoryRoute from './category';
import MainRoute from './main';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/*" element={<AdminLayout />}>
        <Route path="*" element={<MainRoute />} />
      </Route>
      <Route path="/categories/*" element={<AdminLayout />}>
        <Route path="*" element={<CategoryRoute />} />
      </Route>
      <Route path="/stores/*" element={<AdminLayout />}>
        <Route path="*" element={<StoreRoute />} />
      </Route>
    </Routes>
  );
}

export default App;
