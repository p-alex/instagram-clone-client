import { Outlet } from 'react-router-dom';
import useRefreshToken from '../Hooks/useRefreshToken';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../Context/Context';

const PersistLogin = () => {
  const { user } = useContext(AppContext);
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

    if (!user.userId) {
      verifyRefreshToken();
    } else {
      isMounted && setIsLoading(false);
    }

    return () => {
      isMounted = false;
    };
  }, []);

  return <>{isLoading ? <p>Loading...</p> : <Outlet />}</>;
};

export default PersistLogin;
