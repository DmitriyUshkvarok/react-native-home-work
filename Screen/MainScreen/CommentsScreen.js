import { useState, useEffect } from 'react'
import { AntDesign } from '@expo/vector-icons'
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Image,
  Platform,
} from 'react-native'
import { format } from 'date-fns'
import { firestore } from '../../firebase/config'
import {
  collection,
  updateDoc,
  doc,
  addDoc,
  onSnapshot,
} from 'firebase/firestore'
import { useSelector } from 'react-redux'

const CommentsScreen = ({ route }) => {
  const [comment, setComment] = useState('')
  const [allComments, setAllComments] = useState([])

  const { postId, photo } = route.params

  const { login, userId } = useSelector((state) => state.auth)

  useEffect(() => {
    ;(async () => {
      await getAllPosts()
    })()
  }, [])

  const createPost = async () => {
    const date = new Date()

    const formatData = format(new Date(date), 'dd MMMM, yyyy | HH:mm')

    const dbRef = await doc(firestore, 'posts', postId)
    await updateDoc(dbRef, {
      comments: allComments.length + 1,
    })

    await addDoc(collection(dbRef, 'comments'), {
      comment,
      login,
      userId,
      formatData,
    })
    setComment('')
  }

  const getAllPosts = async () => {
    try {
      const dbRef = doc(firestore, 'posts', postId)
      onSnapshot(collection(dbRef, 'comments'), (docSnap) =>
        setAllComments(docSnap.docs.map((doc) => ({ ...doc.data() })))
      )
    } catch (error) {
      console.log(`getAllComments`, error)
    }
  }

  const markupComment = (item) => {
    if (item.userId === userId) {
      return (
        <View
          style={{
            ...styles.containerImgComent,
            marginLeft: Platform.OS === 'ios' ? 0 : 90,
          }}>
          <View
            style={{
              ...styles.commentContainer,
              borderTopLeftRadius: 8,
              borderTopRightRadius: 0,
              borderBottomLeftRadius: 8,
              borderBottomRightRadius: 8,
            }}>
            <Text style={styles.commentTitle}>{item.login}</Text>
            <Text style={styles.commentText}>{item.comment}</Text>
            <Text style={styles.commentData}>{item.formatData}</Text>
          </View>
        </View>
      )
    } else {
      return (
        <View style={styles.containerImgComent}>
          <View style={styles.commentContainer}>
            <Text style={styles.commentText}>{item.comment}</Text>
            <Text style={styles.commentData}>{item.formatData}</Text>
          </View>
        </View>
      )
    }
  }

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.imgContainer}>
          <Image source={{ uri: photo }} style={{ width: 300, height: 200 }} />
        </View>
        <FlatList
          data={allComments}
          renderItem={({ item }) => markupComment(item)}
          keyExtractor={(_, i) => i.toString()}
        />
        <View style={styles.inputCommentContainer}>
          <TextInput
            onChangeText={setComment}
            style={styles.inputComment}
            placeholder="Комментировать..."></TextInput>
          <TouchableOpacity style={styles.btnComment} onPress={createPost}>
            <AntDesign name="arrowup" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  )
}
export default CommentsScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imgContainer: {
    marginBottom: 32,
    marginTop: 32,
    alignItems: 'center',
  },
  img: {
    width: 370,
    height: 240,
    borderRadius: 8,
  },
  commentContainer: {
    paddingTop: 16,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 16,
    width: 250,
    backgroundColor: 'rgba(0, 0, 0, 0.03)',
    marginBottom: 24,
    borderTopRightRadius: 8,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  commentText: {
    fontSize: 13,
    lineHeight: 18,
    color: '#212121',
  },
  inputCommentContainer: {
    marginHorizontal: 10,
    position: 'relative',
    marginTop: 'auto',
    marginBottom: 50,
  },
  inputComment: {
    backgroundColor: '#E8E8E8',
    height: 50,
    borderRadius: 50,
    paddingLeft: 16,
  },
  btnComment: {
    position: 'absolute',
    right: 8,
    top: 7,
    width: 34,
    height: 34,
    borderRadius: 50,
    backgroundColor: '#FF6C00',
    justifyContent: 'center',
    alignItems: 'center',
  },
  commentData: {
    color: '#BDBDBD',
    fontSize: 10,
    lineHeight: 12,
    textAlign: 'right',
  },
  containerImgComent: {
    flex: 1,
    flexDirection: 'row',
  },
  userAvatarImg: { width: 28, height: 28, borderRadius: 100, marginRight: 5 },
})
