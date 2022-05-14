export const GET_USER_QUERY = `
    query getProfileData($username: String!, $authenticatedUserId: String) {
        getUser(username: $username, authenticatedUserId: $authenticatedUserId) {
            statusCode
            success
            message
            isFollowed
            hasFollowings
            user {
              userId
              profilePicture
              fullname
              username
              bio
              followers {
                count
              }
              following {
                count
              }
              posts {
                count
                postsList {
                  id
                  images {
                    croppedImage {
                      url
                    }
                  }
                  likes {
                    count
                    users
                  }
                  comments {
                    count
                  }
                  createdAt
                  updatedAt
                }
              }
            }
          }
    }
`;
