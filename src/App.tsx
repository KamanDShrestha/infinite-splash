import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppLayout from './pages/AppLayout';
import Home from './pages/Home';
import SavedImages from './pages/SavedImages';
import { Toaster } from 'react-hot-toast';
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<Home />} />
            <Route path='/savedImages' element={<SavedImages />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster
        position='top-center'
        containerStyle={{
          padding: '5px',
        }}
        toastOptions={{
          success: {
            duration: 3000,
            style: {
              background: 'white',
              color: 'green',
            },
          },
          error: {
            duration: 4000,
            style: {
              background: 'white',
              color: 'red',
            },
          },
        }}
      />
    </>
  );
};

export default App;
