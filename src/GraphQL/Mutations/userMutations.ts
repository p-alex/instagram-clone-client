export const FOLLOW_OR_UNFOLLOW_USER = `
mutation FollowOrUnfollowUser($userId: String!, $type: String!) {
    followOrUnfollowUser(userId: $userId, type: $type) {
      statusCode
      success
      message
    }
  }
`;
