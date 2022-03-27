export const GET_POST_QUERY = `
query GetPost($postId: String!) {
    getPost(postId: $postId) {
      statusCode
      success
      message
      post {
        id
        user {
          id
          username
          profilePicture
        }
        images  {
          fullImage {
            url
          }
        }
        description
        likes {
          count
          users
        }
        comments {
          count
          comments {
            id
            isReply
            user {
              id
              username
              profilePicture
            }
            comment
            likes {
              count
              users
            }
            postedAt
          }
        }
        postedAt
      }
    }
  }
`;
