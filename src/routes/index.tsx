import { Route, Routes } from "react-router-dom"
import StoreRoute from './storeRoute'
import LoginPage from '../pages/login'
import AdminLayout from '../component/layout/Layout'

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/bo/*" element={<AdminLayout />}>
        <Route path="stores/*" element={<StoreRoute />} />
      </Route>
    </Routes>
  );
}

export default App;