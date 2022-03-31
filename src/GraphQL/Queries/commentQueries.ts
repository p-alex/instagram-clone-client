export const GET_COMMENTS_QUERY = `
query GetComments($postId: String!) {
    getComments(postId: $postId) {
      statusCode
      success
      message
      comments {
        id
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
        replies {
          count
          userReplies
        }
        postedAt
      }
    }
  }
`;
