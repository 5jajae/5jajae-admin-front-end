import { Route, Routes } from 'react-router-dom';
import Category from '../../pages/category';
import CategoryDetail from '../../pages/category/detail/CategoryDetail';

const CategoryRoute = () => {
  return (
    <Routes>
      <Route path="" element={<Category />} />
      <Route path=":id" element={<CategoryDetail />} />
    </Routes>
  );
};

export default CategoryRoute;
