import { Route, Routes } from 'react-router-dom';
import Main from '../../pages/main';

const MainRoute = () => {
  return (
    <Routes>
      <Route path="" element={<Main />} />
    </Routes>
  );
};

export default MainRoute;
