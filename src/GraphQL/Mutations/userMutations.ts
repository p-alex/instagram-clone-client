export const FOLLOW_OR_UNFOLLOW_USER_MUTATION = `
mutation FollowOrUnfollowUser($userId: String!, $type: String!) {
    followOrUnfollowUser(userId: $userId, type: $type) {
      statusCode
      success
      message
    }
  }
`;

export const CHANGE_PROFILE_PICTURE_MUTATION = `
mutation ChangeProfilePicture($image: String!) {
  changeProfilePicture(image: $image) {
    statusCode
    success
    message
    newFullPictureUrl
    newSmallPictureUrl
  }
}
`;

export const REMOVE_PROFILE_PICTURE_MUTATION = `
mutation ChangeProfilePicture {
  removeProfilePicture {
    statusCode
    success
    message
    newPictureUrl
  }
}
`;

export const EDIT_PROFILE_MUTATION = `
mutation ChangeProfilePicture($fullname: String!, $username: String!, $bio: String) {
  editProfile(fullname: $fullname, username: $username, bio: $bio) {
    statusCode
    success
    message
  }
}
`;
