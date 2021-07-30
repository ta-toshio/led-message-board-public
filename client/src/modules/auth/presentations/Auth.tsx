import React, { useEffect } from 'react'
import { UserType } from '../../../actions/user'

type PropsType = {
  loggedIn: (user: UserType) => {},
  children: React.ReactNode
}

const Auth: React.FC<PropsType> = (props: PropsType) => {
  const { loggedIn, children } = props

  useEffect(() => {
    const myUser = sessionStorage.getItem('__credential__')
    myUser && loggedIn(JSON.parse(myUser))
  }, [])

  return (<>{children}</>)
}

export default Auth