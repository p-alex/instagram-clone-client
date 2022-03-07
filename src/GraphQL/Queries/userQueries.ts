export const GET_USER_QUERY = `
    query getProfileData($username: String!) {
        getUser(username: $username) {
            statusCode
            success
            message
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
                  user {
                    id
                    username
                    profilePicture
                  }
                  images {
                    croppedImage
                  }
                  description
                  likes {
                    count
                    users
                  }
                  comments {
                    count
                  }
                  postedAt
                }
              }
            }
          }
    }
`;
