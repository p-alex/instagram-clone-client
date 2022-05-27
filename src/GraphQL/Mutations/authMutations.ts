export const REGISTER_USER_MUTATION = `
mutation RegisterUser(
  $email: String!
  $fullname: String!
  $username: String!
  $password: String!
  $confirmPassword: String!
) {
  registerUser(
    email: $email
    fullname: $fullname
    username: $username
    password: $password
    confirmPassword: $confirmPassword
  ) {
    statusCode
    success
    message
    user {
      id
      username
    }
  }
}
`;

export const LOGIN_USER_MUTATION = `
    mutation LoginUser($username: String!, $password: String!) {
        loginUser(username: $username, password: $password) {
            statusCode
            success
            message
            user {
              id
              username
              fullname
              profileImg
              hasFollowings
              accessToken
            }
        }
    }
`;

export const LOGOUT_USER_MUTATION = `
mutation LogoutUser {
  logoutUser {
    statusCode
    success
    message
  }
}
`;

export const REFRESH_TOKEN_MUTATION = `
mutation {
    refreshToken {
        success
        message
        user {
          id
          username
          fullname
          profileImg
          hasFollowings
          accessToken
        }
    }
}
`;
