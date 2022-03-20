export const CREATE_POST_MUTATION = `
  mutation createPost($caption: String, $image: String!){
    createPost(caption: $caption, image: $image) {
      statusCode
      success
      message
    }
  }
`;

export const LIKE_POST_MUTATION = `
  mutation LikePost($uid: String, $postId: String) {
    likePost(uid: $uid, postId: $postId) {
      statusCode
      success
      message
    }
  }
`;
