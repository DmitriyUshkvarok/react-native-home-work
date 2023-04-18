import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const CommentsScreen = ({ route }) => {
  return (
    <View style={styles.container}>
      <Text>CommentsScreen</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export default CommentsScreen
