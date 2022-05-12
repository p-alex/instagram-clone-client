export const CREATE_POST_MUTATION = `
  mutation createPost($caption: String, $image: String!, $aspectRatio: Float!){
    createPost(caption: $caption, image: $image, aspectRatio: $aspectRatio) {
      statusCode
      success
      message
    }
  }
`;

export const LIKE_OR_DISLIKE_POST_MUTATION = `
  mutation LikeOrDislikePost($postId: String!) {
    likeOrDislikePost(postId: $postId) {
      statusCode
      success
      message
    }
  }
`;

export const DELETE_POST_MUTATION = `
  mutation DeletePost($postId: String!) {
    deletePost(postId: $postId) {
      statusCode
      success
      message
    }
  }
`;
