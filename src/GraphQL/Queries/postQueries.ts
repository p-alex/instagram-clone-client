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
          fullImage
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
`;
