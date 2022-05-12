export const GET_POST_QUERY = `
query GetPost($postId: ID!) {
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
            aspectRatio
          }
        }
        description
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
`;
