import { Outlet } from 'react-router-dom';
import useRefreshToken from '../Hooks/useRefreshToken';
import { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../Context/GlobalContext';
import Spinner from '../Ui/Spinner';

const PersistLogin = () => {
  const { user } = useContext(GlobalContext);
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();

  useEffect(() => {
    let isMounted = true;
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (error: any) {
        console.log(error.message);
      } finally {
        isMounted && setIsLoading(false);
      }
    };

    if (!user?.userId) {
      verifyRefreshToken();
    } else {
      isMounted && setIsLoading(false);
    }

    return () => {
      isMounted = false;
    };
  }, []);

  return <>{isLoading ? <Spinner /> : <Outlet />}</>;
};

export default PersistLogin;
