import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import RegistrationScreen from './Screen/RegistrationScreen'
import LoginScreen from './Screen/LoginScreen'
import Home from './Screen/MainScreen/Home'
import MapScreen from './Screen/MainScreen/MapScreen'
import CommentsScreen from './Screen/MainScreen/CommentsScreen'

const MainStack = createStackNavigator()
const AuthStack = createStackNavigator()

const useRoute = (isAuth) => {
  if (!isAuth) {
    return (
      <AuthStack.Navigator>
        <AuthStack.Screen
          name="Registration"
          component={RegistrationScreen}
          options={{ headerShown: false }}
        />
        <AuthStack.Screen
          name="LogIn"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
      </AuthStack.Navigator>
    )
  }
  return (
    <MainStack.Navigator initialRouteName="Home">
      <MainStack.Screen
        options={{
          headerShown: false,
          tabBarShowLabel: false,
        }}
        name="Home"
        component={Home}
      />
      <MainStack.Screen
        options={{
          headerTitleAlign: 'center',
          title: 'Коментарии',
        }}
        name="Comments"
        component={CommentsScreen}
      />
      <MainStack.Screen
        options={{
          headerTitleAlign: 'center',
          title: 'Карта',
        }}
        name="Map"
        component={MapScreen}
      />
    </MainStack.Navigator>
  )
}
export default useRoute
