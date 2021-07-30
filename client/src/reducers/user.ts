import { types } from '../actions/user'

const initialState = {
  loggedInUser: null,
}

const userReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case types.USER_LOGGED_IN:
      return {
        ...state,
        loggedInUser: action.payload.user
      }
    case types.USER_LOGOUT:
        return {
          ...state,
          loggedInUser: null,
        }
    default:
      return state
  }
}

export default userReducer