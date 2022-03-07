import { useContext } from 'react';
import { ProfileContext } from '../../Context/ProfileContext';
import { DEFAULT_PROFILE_PICTURE_URL } from '../../default-profile-pic-url';
import './ProfileDetails.scss';

const ProfileDetails = () => {
  const { profileData, isLoading } = useContext(ProfileContext);
  return (
    <>
      {profileData ? (
        <header className="profileDetails">
          <div className="profileDetails__picture">
            <img
              src={
                profileData?.profilePicture
                  ? profileData?.profilePicture
                  : DEFAULT_PROFILE_PICTURE_URL
              }
              alt={`${profileData?.username}'s profile pic`}
              width="150"
              height="150"
            />
          </div>
          <section className="profileDetails__details">
            <div className="profileDetails__nameAndSettings">
              <h2 className="profileDetails__username">{profileData?.username}</h2>
            </div>
            <div className="profileDetails__stats">
              <p className="profileDetails__stat">
                <span>{profileData?.posts.count}</span>{' '}
                {profileData?.posts.count === 1 ? 'post' : 'posts'}
              </p>
              <p className="profileDetails__stat">
                <span>{profileData?.followers.count}</span>{' '}
                {profileData?.followers.count === 1 ? 'follower' : 'followers'}
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
