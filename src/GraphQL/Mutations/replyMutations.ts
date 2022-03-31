export const ADD_REPLY_MUTATION = `
mutation AddReply($reply: String!, $repliedTo: String!, $commentId: String!) {
    addReply(reply: $reply, repliedTo: $repliedTo, commentId: $commentId) {
      statusCode
      success
      message
    }
  }
`;
export const DELETE_REPLY_MUTATION = `
mutation DeleteReply($replyId: String!) {
    deleteReply(replyId: $replyId) {
      statusCode
      success
      message
    }
  }
`;
export const LIKE_OR_DISLIKE_REPLY_MUTATION = `
mutation DeleteReply($replyId: String!) {
    likeOrDislikeReply(replyId: $replyId) {
      statusCode
      success
      message
    }
  }
`;
