import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Home from './Home'
import CommentsScreen from './CommentsScreen'
import MapScreen from './MapScreen'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'

const NestedScreen = createStackNavigator()

const PostsScreen = () => {
  return (
    <NestedScreen.Navigator>
      <NestedScreen.Screen
        ptions={{
          tabBarShowLabel: false,
          headerTitleAlign: 'center',
          title: 'Публикации',
          // headerRight: () => (
          //   <TouchableOpacity style={styles.BtnlogOut}>
          //     <MaterialIcons name="logout" size={24} color="black" />
          //   </TouchableOpacity>
          // ),
        }}
        name="Публикации"
        component={Home}
      />
      <NestedScreen.Screen name="Comments" component={CommentsScreen} />
      <NestedScreen.Screen name="Map" component={MapScreen} />
    </NestedScreen.Navigator>
  )
}

export default PostsScreen
