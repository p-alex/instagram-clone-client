export const GET_COMMENTS_QUERY = `
query GetComments($postId: String!, $maxCommentsPerPage: Int!, $currentPage: Int!) {
    getComments(postId: $postId, maxCommentsPerPage: $maxCommentsPerPage, currentPage: $currentPage) {
      statusCode
      success
      message
      comments {
        id
        user {
            id
            username
            profilePicture {
              smallPicture
            }
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
        createdAt
        updatedAt
      }
    }
  }
`;
