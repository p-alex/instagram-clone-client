import Layout from './Layout/Layout';
import Register from './Pages/Register/Register';
import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import { ContextWrapper } from './Context/Context';
import RequireAuth from './Components/RequireAuth';

function App() {
  return (
    <ContextWrapper>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route element={<RequireAuth />}>
            <Route index element={<Home />} />
          </Route>
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
        </Route>
      </Routes>
    </ContextWrapper>
  );
}

export default App;
