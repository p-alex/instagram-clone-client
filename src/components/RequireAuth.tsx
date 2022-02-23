import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { useContext } from 'react';
import { GlobalContext } from '../Context/GlobalContext';
const RequireAuth = () => {
  const { user } = useContext(GlobalContext);
  const location = useLocation();

  return user.userId !== '' ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
