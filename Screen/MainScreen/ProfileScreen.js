import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { firestore } from '../../firebase/config'
import { authSignOutUser } from '../../redux/auth/authOperations'
import { MaterialIcons } from '@expo/vector-icons'
import { collection, query, where, onSnapshot } from 'firebase/firestore'
import { SimpleLineIcons, EvilIcons } from '@expo/vector-icons'
import {
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ImageBackground,
} from 'react-native'

const ProfileScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([])
  const { userId, login } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  const screenWidth = Dimensions.get('window').width

  useEffect(() => {
    getUserPosts()
  }, [])

  const getUserPosts = async () => {
    const q = query(
      collection(firestore, 'posts'),
      where('userId', '==', userId)
    )
    onSnapshot(q, (docSnap) =>
      setPosts(docSnap.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    )
  }

  const signOut = () => {
    dispatch(authSignOutUser())
  }

  return (
    <ImageBackground style={styles.imageBg}>
      <View style={styles.container}>
        <View style={styles.wrappContent}>
          <TouchableOpacity onPress={signOut} style={styles.btnSignOut}>
            <MaterialIcons name="logout" size={24} color="black" />
          </TouchableOpacity>
          <View style={styles.nameProfile}>
            <Text style={styles.userTitle}>{login}</Text>
          </View>
          <FlatList
            data={posts}
            keyExtractor={(_, i) => i.toString()}
            renderItem={({ index, item }) => (
              <View style={styles.wrapImg}>
                <Image
                  source={{ uri: item.photo }}
                  style={{
                    ...styles.img,
                    width: screenWidth * 0.9,
                    height: screenWidth * 0.65,
                  }}
                />
                <View style={styles.wrappIcon}>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('Comments', {
                        postId: item.id,
                        photo: item.photo,
                      })
                    }}>
                    <EvilIcons name="comment" size={24} color="#BDBDBD" />
                  </TouchableOpacity>
                  <View style={styles.wrappContentIcon}>
                    <View style={styles.wrapCountComment}>
                      <Text style={styles.countComment}>{item.comments}</Text>
                    </View>
                  </View>

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
              </View>
            )}
          />
        </View>
      </View>
    </ImageBackground>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
  imageBg: { flex: 1 },
  container: {
    flex: 1,
    marginTop: 147,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: 'rgba(180, 180, 180, 0.2)',
    paddingHorizontal: 16,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingBottom: 150,
  },

  wrapImg: {
    marginBottom: 34,
  },

  wrappContentPost: {
    marginTop: 8,
    marginBottom: 11,
  },

  countComment: { fontSize: 16, lineHeight: 19 },

  btnSignOut: {
    position: 'absolute',
    right: 0,
    top: 20,
    zIndex: 1000,
  },

  wrapCountComment: { marginLeft: 5, justifyContent: 'center' },

  wrappContentIcon: {
    flex: 1,
    flexDirection: 'row',
  },

  wrappContent: { position: 'relative' },

  iconThumbUp: { marginLeft: 27 },

  img: {
    width: 280,
    height: 200,
    borderRadius: 8,
    overflow: 'hidden',
  },

  placeTitle: {
    color: '#212121',
    fontWeight: 500,
    fontSize: 16,
    lineHeight: 19,
  },

  nameLocation: {
    fontSize: 16,
    lineHeight: 19,
    textAlign: 'right',
    textDecorationLine: 'underline',
  },

  wrappIconMap: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },

  wrappIcon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  nameProfile: {
    marginBottom: 33,
    marginTop: 15,
  },

  userTitle: {
    textAlign: 'center',
    color: '#212121',
    fontFamily: 'Bold',
    fontSize: 20,
    lineHeight: 35,
    letterSpacing: 0.01,
    marginTop: 63,
  },
  avatarUser: {
    width: 120,
    height: 120,
    borderRadius: 16,
  },
})
