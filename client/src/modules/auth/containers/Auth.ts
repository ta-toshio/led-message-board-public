import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import AuthPresentation from '../presentations/Auth'
import { loggedIn, UserType } from '../../../actions/user'

const mapDispatchToProps = (dispatch: Dispatch) => ({
  loggedIn: (user: UserType) => dispatch(loggedIn(user)),
})

export default connect(
  null,
  mapDispatchToProps
)(AuthPresentation)