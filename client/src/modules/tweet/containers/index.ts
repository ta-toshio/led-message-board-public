import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import axios from 'axios'
import get from '../../../libs/get'
import TweetPresentation from '../presentations'
import { API_URL } from '../../../config'

const mapStateToProps = (state: any) => ({
  file: get([ 'file' ], state),
  user: get([ 'user', 'loggedInUser' ], state),
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  tweet: (params: any) => {
    const { file, user } = params
    if (!file.base64 || !user || !file.text) {
      return
    }

    const formData = {
      text: file.text,
      image: file.base64.replace(/^data:.+;base64,/, ''),
      access_token: user.accessToken,
      access_token_secret: user.secret
    }

    return axios.post(`${API_URL}/upload`, formData)
      .then(res => {
        return res.data.success
      })
      .catch(e => console.log(e))
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TweetPresentation)
