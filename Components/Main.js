import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import { authSlice } from '../redux/auth/authReducers'
import useRoute from '../router'
import { authStateChangeUser } from '../redux/auth/authOperations'

const Main = () => {
  const { stateChange } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(authStateChangeUser())
  }, [stateChange])

  const routing = useRoute(stateChange)

  return <NavigationContainer>{routing}</NavigationContainer>
}
export default Main
