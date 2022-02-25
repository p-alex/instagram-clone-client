import Layout from './Layout/Layout';
import Register from './Pages/Register/Register';
import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import { GlobalContextProvider } from './Context/GlobalContext';
import RequireAuth from './Components/RequireAuth';
import PersistLogin from './Components/PersistLogin';

function App() {
  return (
    <GlobalContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route element={<PersistLogin />}>
            <Route element={<RequireAuth />}>
              <Route index element={<Home />} />
            </Route>
          </Route>
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
        </Route>
      </Routes>
    </GlobalContextProvider>
  );
}

export default App;
