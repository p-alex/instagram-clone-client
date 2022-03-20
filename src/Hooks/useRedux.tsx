import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../Redux/Store';

const useRedux = () => {
  const authState = useSelector((state: RootState) => state.auth);
  const profileState = useSelector((state: RootState) => state.profile);
  const postState = useSelector((state: RootState) => state.post);
  const dispatch = useDispatch();
  return { authState, profileState, postState, dispatch };
};

export default useRedux;
