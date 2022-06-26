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
          profilePicture {
            smallPicture
          }
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
          users
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
        profilePicture {
          smallPicture
        }
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
      isPostOwnerFollowed
    }
  }
}
`;

export const GET_MORE_PROFILE_POSTS = `
query GetMoreProfilePosts($userId: String!, $currentPostId: String!) {
  getMoreProfilePosts(userId: $userId, currentPostId: $currentPostId) {
    statusCode
    success
    message
    posts {
      id
      images {
        croppedImage {
          url
        }
      }
      likes {
        count
      }
      comments {
        count
      }
    }
  }
}
`;
