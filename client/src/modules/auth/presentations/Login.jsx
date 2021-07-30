import React from 'react'
import {
  Box,
  Button,
} from '@chakra-ui/core'

const Login = ({ login, logout, user }) => {
  return (
    <Box d="flex" mt="8" justifyContent="center">
      {!user && (
        <Button
          size={'lg'}
          onClick={login}
        >ツイートするには Twitter ログインが必要です</Button>
      )}
      {/*user && (
        <Button onClick={logout}>
          Logout
        </Button>
      )*/}
    </Box>
  )
}

export default Login