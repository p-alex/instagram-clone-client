import "./ProfileDetails.scss";
import useRedux from "../../Hooks/useRedux";
import FollowButton from "../FollowButton/FollowButton";

const ProfileDetails = () => {
  const { authState, profileState } = useRedux();
  const profileData = profileState.user;
  return (
    <>
      {profileData ? (
        <header className="profileDetails">
          <div className="profileDetails__picture">
            <img
              src={profileData?.profilePicture}
              alt={`${profileData?.username}'s profile pic`}
              width="150"
              height="150"
            />
          </div>
          <section className="profileDetails__details">
            <div className="profileDetails__nameAndSettings">
              <h2 className="profileDetails__username">
                {profileData?.username}
              </h2>
              {authState.accessToken &&
                authState.user?.username !== profileData.username && (
                  <FollowButton
                    userId={profileData.userId}
                    isFollowed={profileState.isFollowed}
                  />
                )}
            </div>
            <div className="profileDetails__stats">
              <p className="profileDetails__stat">
                <span>{profileData?.posts.count}</span>{" "}
                {profileData?.posts.count === 1 ? "post" : "posts"}
              </p>
              <p className="profileDetails__stat">
                <span>{profileData?.followers.count}</span>{" "}
                {profileData?.followers.count === 1 ? "follower" : "followers"}
              </p>
              <p className="profileDetails__stat">
                <span>{profileData?.following.count}</span> following
              </p>
            </div>
            <p className="profileDetails__fullname">{profileData?.fullname}</p>
            {profileData?.bio && (
              <p className="profileDetails__bio">{profileData?.bio}</p>
            )}
          </section>
        </header>
      ) : (
        <p>This user doesn't exist</p>
      )}
    </>
  );
};

export default ProfileDetails;
