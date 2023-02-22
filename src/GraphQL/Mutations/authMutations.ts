export const REGISTER_USER_MUTATION = `
mutation RegisterUser(
  $email: String!
  $username: String!
  $password: String!
  $confirmPassword: String!
  $recaptchaToken: String!
) {
  registerUser(
    email: $email
    username: $username
    password: $password
    confirmPassword: $confirmPassword
    recaptchaToken: $recaptchaToken
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
    mutation LoginUser($username: String!, $password: String!, $recaptchaToken: String!) {
        loginUser(username: $username, password: $password, recaptchaToken: $recaptchaToken) {
            statusCode
            success
            message
            user {
              id
              username
              email
              bio
              fullname
              profilePicture {
                fullPicture
                smallPicture
              }
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
          email
          bio
          fullname
          profilePicture {
            fullPicture
            smallPicture
          }
          hasFollowings
          accessToken
        }
    }
}
`;

export const CHANGE_PASSWORD_MUTATION = `
mutation ChangePassword($oldPassword: String!, $newPassword: String!) {
  changePassword(oldPassword: $oldPassword, newPassword: $newPassword) {
    statusCode
    success
    message
  }
}
`;

export const CONFIRM_EMAIL_MUTATION = `
mutation ConfirmEmail($confirmationCode: String!) {
  confirmEmail(confirmationCode: $confirmationCode) {
    statusCode
    success
    message
  }
}
`;

export const RESET_PASSWORD_MUTATION = `
mutation ResetPasswordSendEmail($token: String!, $newPassword: String!, $confirmNewPassword: String!) {
  resetPassword(token: $token, newPassword: $newPassword, confirmNewPassword: $confirmNewPassword) {
    statusCode
    success
    message
  }
}
`;

export const RESET_PASSWORD_SEND_EMAIL_MUTATION = `
mutation ResetPasswordSendEmail($email: String!, $recaptchaToken: String!) {
  resetPasswordSendEmail(email: $email, recaptchaToken: $recaptchaToken) {
    statusCode
    success
    message
  }
}
`;

export const VERIFY_RESET_PASSWORD_TOKEN = `
mutation VerifyResetPasswordToken($token: String!) {
  verifyResetPasswordToken(token: $token) {
    statusCode
    success
    message
  }
}
`;
