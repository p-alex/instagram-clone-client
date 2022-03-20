import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../Redux/Store';
const RequireAuth = () => {
  const authState = useSelector((state: RootState) => state.auth);

  const location = useLocation();

  return authState.user?.id !== '' ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
