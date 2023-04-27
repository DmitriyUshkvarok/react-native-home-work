import { SimpleLineIcons, EvilIcons } from '@expo/vector-icons'
import React, { useEffect, useState } from 'react'
import {
  View,
  StyleSheet,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native'

import { firestore } from '../../firebase/config'
import { collection, onSnapshot } from 'firebase/firestore'

const PostsScreen = ({ navigation, route }) => {
  const [posts, setPosts] = useState([])

  const getAllPosts = async () => {
    const dbRef = await collection(firestore, 'posts')
    onSnapshot(dbRef, (docSnap) =>
      setPosts(docSnap.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    )
  }

  useEffect(() => {
    ;(async () => {
      await getAllPosts()
    })()
  }, [route.params])

  return (
    <>
      <View style={styles.container}>
        <View style={{ marginTop: 110 }}>
          <FlatList
            data={posts}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <>
                <View style={{ padding: 10 }}>
                  <Image
                    source={{ uri: item.photo }}
                    style={{ height: 200, borderRadius: 10 }}
                  />
                </View>
                <Text style={styles.comment}>{item.comment}</Text>
                <View style={styles.infoPostBar}>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('Comments', {
                        postId: item.id,
                        photo: item.photo,
                      })
                    }}>
                    <EvilIcons name="comment" size={24} color="#BDBDBD" />
                  </TouchableOpacity>

                  <View style={styles.locationWrapper}>
                    <TouchableOpacity
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}
                      onPress={() => {
                        navigation.navigate('Map', { location: item.location })
                      }}>
                      <SimpleLineIcons
                        style={{ marginRight: 10 }}
                        name="location-pin"
                        size={24}
                        color="#BDBDBD"
                      />
                      <Text style={{ fontSize: 15 }}>location</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </>
            )}
          />
        </View>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  infoPostBar: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginHorizontal: 10,
  },
  comment: {
    fontSize: 16,
    color: '#212121',
    marginBottom: 10,
    marginHorizontal: 10,
  },
})

export default PostsScreen
