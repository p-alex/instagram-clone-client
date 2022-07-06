import { Outlet } from "react-router-dom";
import useRefreshToken from "../Hooks/useRefreshToken";
import { useEffect, useState } from "react";
import Spinner from "../Ui/Spinner";
import { useSelector } from "react-redux";
import { RootState } from "../Redux/Store";

const PersistLogin = () => {
  const authState = useSelector((state: RootState) => state.auth);
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

    if (!authState.user?.id) {
      verifyRefreshToken();
    } else {
      isMounted && setIsLoading(false);
    }

    return () => {
      isMounted = false;
    };
  }, []);

  return <>{isLoading ? <Spinner size="small" /> : <Outlet />}</>;
};

export default PersistLogin;
