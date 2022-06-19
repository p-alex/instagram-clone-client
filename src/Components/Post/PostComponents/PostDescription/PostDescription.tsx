import { useState } from "react";
import { Link } from "react-router-dom";
import "./PostDescription.scss";

const MAX_DESCRIPTION_CHARS = 150;

const PostDescription = ({
  username,
  profilePicture,
  description,
  showProfilePicture,
  noPadding,
}: {
  username: string;
  profilePicture: string;
  description: string;
  postedAt: string;
  showProfilePicture: boolean;
  noPadding?: boolean;
}) => {
  const [isShowMore, setIsShowMore] = useState(true);
  const handleToggleShowMore = () => setIsShowMore(!isShowMore);
  return (
    <div className="postDescription">
      <div
        className="postDescription__container"
        style={noPadding ? { padding: "0" } : {}}
      >
        {showProfilePicture && (
          <img
            src={profilePicture}
            alt=""
            width="30"
            height="30"
            className="postDescription__profileImg"
          />
        )}

        <div className="postDescription__body">
          <div className="postDescription__usernameAndText">
            <p className="postDescription__text">
              <Link
                to={`/users/${username} `}
                className="postDescription__usernameLink"
              >
                {username}
              </Link>{" "}
              {description &&
              description.length > MAX_DESCRIPTION_CHARS &&
              isShowMore
                ? description.slice(0, MAX_DESCRIPTION_CHARS)
                : description}
              {description && description.length > MAX_DESCRIPTION_CHARS && (
                <button
                  className="postDescription__showMoreBtn"
                  onClick={handleToggleShowMore}
                >
                  {isShowMore ? "show more..." : "show less"}
                </button>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDescription;
