import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { GET_USER_FOLLOWERS } from "../../GraphQL/Queries/userQueries";
import useFetchWithRetry from "../../Hooks/useFetchWithRetry";
import { RootState } from "../../Redux/Store";
import Spinner from "../../Ui/Spinner";
import FocusTrapRedirectFocus from "../FocusTrap";
import FollowButton from "../FollowButton/FollowButton";
import "./FollowersModal.scss";

interface Props {
  userId: string;
  type: "followers" | "following";
  setSelectedUsersModal: React.Dispatch<
    React.SetStateAction<"followers" | "following" | null>
  >;
}

interface IFollower {
  id: string;
  username: string;
  profilePicture: string;
  isFollowed: boolean;
}

const MAX_USERS_PER_PAGE = 30;

const FollowersModal = (props: Props) => {
  const authState = useSelector((state: RootState) => state.auth);
  const params = useParams();

  const firstFocusableElement = useRef<any>();
  const lastFocusableElement = useRef<any>();

  const [users, setUsers] = useState<IFollower[]>([]);

  const [currentPage, setCurrentPage] = useState(0);
  const [showLoadMore, setShowLoadMore] = useState(false);

  const [getFollowersRequest, { isLoading }] = useFetchWithRetry({
    query: GET_USER_FOLLOWERS,
    variables: {
      userId: props.userId,
      type: props.type,
      maxUsersPerPage: MAX_USERS_PER_PAGE,
      currentPage,
    },
    accessToken: authState.accessToken,
  });

  const getUsers = async () => {
    try {
      const response = await getFollowersRequest();
      if (response.success) {
        setUsers((prevState) => [...prevState, ...response.users]);
        if (response.users.length === MAX_USERS_PER_PAGE) {
          setShowLoadMore(true);
        } else {
          setShowLoadMore(false);
        }
      }
    } catch (error) {
      console.log("Something went wrong");
    }
  };

  const handleChangeState = (id: string) => {
    setUsers(
      users.map((user) => {
        if (user.id === id) {
          user.isFollowed = !user.isFollowed;
          return user;
        }
        return user;
      })
    );
  };

  useEffect(() => {
    getUsers();
  }, [currentPage]);

  useEffect(() => {
    return () => {
      props.setSelectedUsersModal(null);
    };
  }, [params.username]);

  useEffect(() => {
    document.body.style.cssText = `overflow-y:hidden`;
    return () => {
      document.body.removeAttribute("style");
    };
  }, []);

  return (
    <div className="followersModal">
      <FocusTrapRedirectFocus element={lastFocusableElement} />
      <div
        className="followersModal__backdrop"
        onClick={() => props.setSelectedUsersModal(null)}
      ></div>
      <div className="followersModal__container">
        <div className="followersModal__header">
          <h2 className="followersModal__title">{props.type}</h2>
          <button
            className="followersModal__closeBtn"
            onClick={() => props.setSelectedUsersModal(null)}
            ref={firstFocusableElement}
            autoFocus={true}
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        <div className="followersModal__users">
          {users &&
            users.map((user) => {
              return (
                <div className="followersModal__user" key={user.id}>
                  <img
                    src={user.profilePicture}
                    alt=""
                    width="40"
                    height="40"
                    className="followersModal__profilePicture"
                  />
                  <Link
                    to={`/users/${user.username}`}
                    className="followersModal__profileLink"
                  >
                    {user.username}
                  </Link>
                  <div className="followersModal__btns">
                    <FollowButton
                      isFollowed={user.isFollowed}
                      userId={user.id}
                      username={user.username}
                      changeStateFunction={() => handleChangeState(user.id)}
                      buttonRef={!showLoadMore ? lastFocusableElement : null}
                    />
                  </div>
                </div>
              );
            })}
          {!isLoading && users.length === 0 && <p>No users found.</p>}
          {isLoading && <Spinner size="small" />}
        </div>
        {showLoadMore && (
          <button
            onClick={() => setCurrentPage((prevState) => prevState + 1)}
            className="followersModal__loadMoreBtn"
            ref={lastFocusableElement}
          >
            Load More
          </button>
        )}
      </div>
      <FocusTrapRedirectFocus element={firstFocusableElement} />
    </div>
  );
};

export default FollowersModal;
