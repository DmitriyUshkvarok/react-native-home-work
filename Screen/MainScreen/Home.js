import React, { useEffect, useState } from 'react'
import { View, StyleSheet, FlatList, Image, Text } from 'react-native'
// import { createStackNavigator } from '@react-navigation/stack'
// import { NativeScreen } from 'react-native-screens'

const Home = ({ navigation, route }) => {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    if (route.params) {
      setPosts((prevState) => [...prevState, route.params])
    }
  }, [route.params])
  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 10 }}>
            <Image
              source={{ uri: item.photo }}
              style={{ marginHorizontal: 10, height: 200 }}
            />
          </View>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export default Home
