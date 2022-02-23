import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { useContext } from 'react';
import { AppContext } from '../Context/GlobalContext';
const RequireAuth = () => {
  const { user } = useContext(AppContext);
  const location = useLocation();

  return user.userId !== '' ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
