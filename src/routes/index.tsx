import { Route, Routes } from "react-router-dom"
import StoreRoute from './storeRoute'

function App() {
  return (
    <Routes>
      <Route path="/stores/*" element={<StoreRoute />} />
    </Routes>
  );
}

export default App;