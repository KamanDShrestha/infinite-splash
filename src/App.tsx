import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppLayout from './pages/AppLayout';
import Home from './pages/Home';
import SavedImages from './pages/SavedImages';
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path='/savedImages' element={<SavedImages />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
