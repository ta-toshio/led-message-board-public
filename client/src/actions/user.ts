
export const types = {
  USER_LOGGED_IN: 'USER/LOGGED_IN',
  USER_LOGOUT: 'USER/LOGOUT',
}

export interface UserType {
  accessToken: string
  secret: string
  name: string
}

export const loggedIn = (user: UserType) => ({
  type: types.USER_LOGGED_IN,
  payload: {
    user
  }
})

export const logout = () => ({
  type: types.USER_LOGOUT,
})