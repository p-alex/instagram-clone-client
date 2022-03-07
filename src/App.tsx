import Layout from './Layout/Layout';
import Register from './Pages/Register/Register';
import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import { GlobalContextProvider } from './Context/GlobalContext';
import RequireAuth from './Components/RequireAuth';
import PersistLogin from './Components/PersistLogin';
import Profile from './Pages/Profile/Profile';

function App() {
  return (
    <GlobalContextProvider>
      <Routes>
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth />}>
            <Route index element={<Home />} />
          </Route>
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="users/:username" element={<Profile />} />
        </Route>
        <Route
          path="*"
          element={
            <main style={{ padding: '1rem' }}>
              <p>There's nothing here!</p>
            </main>
          }
        />
      </Routes>
    </GlobalContextProvider>
  );
}

export default App;
