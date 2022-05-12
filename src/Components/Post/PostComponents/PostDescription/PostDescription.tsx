import { useState } from "react";
import { Link } from "react-router-dom";
import { dateConverter } from "../../../../Util/dateConverter";
import CommentBottom from "../../../Comment/CommentComponents/CommentBottom/CommentBottom";

const PostDescription = ({
  username,
  profilePicture,
  description,
  postedAt,
}: {
  username: string;
  profilePicture: string;
  description: string;
  postedAt: string;
}) => {
  const [isShowMore, setIsShowMore] = useState(true);
  const handleToggleShowMore = () => setIsShowMore(!isShowMore);
  return (
    <div className="comment">
      <div className="comment__container">
        <img
          src={profilePicture}
          alt=""
          width="35"
          height="35"
          className="comment__profileImg"
        />
        <div className="comment__body">
          <div className="comment__usernameAndText">
            <p className="comment__text">
              <Link
                to={`/users/${username} `}
                className="comment__usernameLink"
              >
                {username}
              </Link>{" "}
              {description && description.length > 250 && isShowMore
                ? description.slice(0, 250)
                : description}
              {description && description.length > 250 && (
                <button
                  className="comment__showMoreBtn"
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
