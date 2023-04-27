import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { MaterialIcons, Ionicons } from '@expo/vector-icons'
import PostsScreen from './PostsScreen'
import CreatePostsScreen from './CreatePostsScreen'
import ProfileScreen from './ProfileScreen'
import { authSignOutUser } from '../../redux/auth/authOperations'
import { useDispatch } from 'react-redux'

const MainTab = createBottomTabNavigator()

const Home = () => {
  const dispatch = useDispatch()
  const signOut = () => {
    dispatch(authSignOutUser())
  }

  return (
    <View style={styles.container}>
      <MainTab.Navigator tabBarOptions={{ showLabel: false }}>
        <MainTab.Screen
          options={{
            tabBarShowLabel: false,
            headerTitleAlign: 'center',
            title: 'Публикации',
            headerRight: () => (
              <TouchableOpacity onPress={signOut} style={styles.BtnlogOut}>
                <MaterialIcons name="logout" size={24} color="black" />
              </TouchableOpacity>
            ),
            tabBarIcon: ({ focused, color, size }) => (
              <Ionicons name="ios-grid-outline" size={size} color={color} />
            ),
          }}
          name="Posts"
          component={PostsScreen}
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
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export default Home
