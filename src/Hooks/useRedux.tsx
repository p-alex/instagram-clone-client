import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../Redux/Store";

const useRedux = () => {
  const authState = useSelector((state: RootState) => state.auth);
  const profileState = useSelector((state: RootState) => state.profile);
  const postState = useSelector((state: RootState) => state.post);
  const commentsSectionState = useSelector(
    (state: RootState) => state.commentsSection
  );
  const suggestionsState = useSelector((state: RootState) => state.suggestions);
  const feedState = useSelector((state: RootState) => state.feed);
  const dispatch = useDispatch();
  return {
    authState,
    profileState,
    postState,
    commentsSectionState,
    suggestionsState,
    feedState,
    dispatch,
  };
};

export default useRedux;
