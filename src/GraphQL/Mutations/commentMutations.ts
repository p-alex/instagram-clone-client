export const ADD_COMMENT_MUTATION = `
    mutation AddComment($comment: String!, $postId: String!) {
        addComment(comment: $comment, postId: $postId) {
          statusCode
          success
          message
          comment {
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
export const DELETE_COMMENT_MUTATION = `
mutation DeleteComment($commentId: String!, $postId: String!) {
    deleteComment(commentId: $commentId, postId: $postId) {
      statusCode
      success
      message
    }
  }
`;
export const LIKE_OR_DISLIKE_COMMENT_MUTATION = `
mutation LikeOrDislikeComment($commentId: String!) {
    likeOrDislikeComment(commentId: $commentId) {
      statusCode
      success
      message
    }
  }
`;
