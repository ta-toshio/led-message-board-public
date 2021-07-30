import { connect } from 'react-redux'
import LoginPresentation from '../presentations/Login'
import { auth, providerTwitter } from '../../../libs/firebase'
import { loggedIn, logout } from '../../../actions/user'
import get from '../../../libs/get'

const mapDispatchToProps = dispatch => ({
  login: event => {
    return auth.signInWithPopup(providerTwitter)
      .then(({ user, credential }) => {
        const { accessToken, secret } = credential

        const myUser = {
          accessToken,
          secret,
          name: user.displayName
        }

        sessionStorage.setItem('__credential__', JSON.stringify(myUser))

        dispatch(loggedIn(myUser))
      })
      .catch(e => console.log(e))
  },
  logout: event => {
    return auth.signOut()
      .then(() => {
        dispatch(logout())
      }).catch(e => console.log(e))
  }
})

const mapStateToProps = state => ({
  user: get(['user', 'loggedInUser'], state)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
  )(LoginPresentation)