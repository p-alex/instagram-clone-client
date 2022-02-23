export const CREATE_POST_MUTATION = `
  mutation createPost($caption: String, $image: String!){
    createPost(caption: $caption, image: $image) {
      statusCode
      success
      message
      post {
        id
        userId
        postedAt
      }
    }
  }
`;
