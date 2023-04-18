import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Ionicons } from '@expo/vector-icons'
import RegistrationScreen from './Screen/RegistrationScreen'
import LoginScreen from './Screen/LoginScreen'
import ProfileScreen from './Screen/MainScreen/ProfileScreen'
import PostsScreen from './Screen/MainScreen/PostsScreen'
import CreatePostsScreen from './Screen/MainScreen/CreatePostsScreen'

const MainTab = createBottomTabNavigator()
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
    <MainTab.Navigator tabBarOptions={{ showLabel: false }}>
      <MainTab.Screen
        name="PostsScreen"
        component={PostsScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name="ios-grid-outline" size={size} color={color} />
          ),
        }}
      />
      <MainTab.Screen
        name="CreatePostsScreen"
        component={CreatePostsScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name="add-outline" size={size} color={color} />
          ),
        }}
      />
      <MainTab.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }}
      />
    </MainTab.Navigator>
  )
}
export default useRoute
