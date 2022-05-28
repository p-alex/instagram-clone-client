export const GET_POST_QUERY = `
query GetPost($postId: ID!, $userId: String) {
    getPost(postId: $postId, userId: $userId) {
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
        }
        comments {
          count
        }
        createdAt
        isLiked
        isPostOwnerFollowed
      }
    }
  }
`;

export const GET_FEED_POSTS = `
query GetFeedPosts($currentPage: Int!, $maxPostsPerPage: Int!) {
  getFeedPosts(currentPage: $currentPage, maxPostsPerPage: $maxPostsPerPage) {
    statusCode
    success
    message
    posts {
      id
      user {
        id
        username
        profilePicture
      }
      images {
        fullImage {
          url
          aspectRatio
        }
      }
      description
      likes {
        count
      }
      comments {
        count
      }
      createdAt
      isLiked
    }
  }
}
`;
