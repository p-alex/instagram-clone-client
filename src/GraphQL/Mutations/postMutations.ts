export const CREATE_POST_MUTATION = `
  mutation createPost($caption: String, $image: String!){
    createPost(caption: $caption, image: $image) {
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
  mutation DeletePost($id: String!, $postIndex: Int!) {
    deletePost(id: $id, postIndex: $postIndex) {
      statusCode
      success
      message
    }
  }
`;
