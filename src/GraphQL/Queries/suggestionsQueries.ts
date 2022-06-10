export const GET_SUGGESTIONS_QUERY = `
query GetSuggestions {
    getSuggestions {
      statusCode
      success
      message
      suggestions {
        id
        username
        profilePicture {
          smallPicture
        }
        isFollowed
      }
    }
  }
`;
