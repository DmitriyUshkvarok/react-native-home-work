import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native'
import { Camera } from 'expo-camera'
import { useState, useEffect } from 'react'
import { Feather, SimpleLineIcons, AntDesign } from '@expo/vector-icons'
import * as Location from 'expo-location'

const CreatePostsScreen = ({ navigation }) => {
  const [cameraRef, setCameraRef] = useState(null)
  const [photo, setPhoto] = useState('')
  const [location, setLocation] = useState(null)

  const takePhotoCamera = async () => {
    const { uri } = await cameraRef.takePictureAsync()
    const location = await Location.getCurrentPositionAsync()
    setPhoto(uri)
  }

  // useEffect(() => {
  //   ;(async () => {
  //     let { status } = await Location.requestForegroundPermissionsAsync()
  //     if (status !== 'granted') {
  //       console.log('Permission to access location was denied')
  //       return
  //     }

  //     let location = await Location.getCurrentPositionAsync({})
  //     setLocation(location)
  //     const coords = {
  //       latitude: location.coords.latitude,
  //       longitude: location.coords.longitude,
  //     }
  //   })()
  // }, [])

  const sendPhoto = () => {
    navigation.navigate('Home', { photo })
  }

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} ref={setCameraRef}>
        {photo && (
          <View style={styles.takePhotoContainer}>
            <Image
              source={{ uri: photo }}
              style={{
                height: 100,
                width: 100,
              }}
            />
          </View>
        )}
        <TouchableOpacity style={styles.btnCamera} onPress={takePhotoCamera}>
          <Feather
            style={styles.cameraIcon}
            name="camera"
            size={24}
            color="#BDBDBD"
          />
        </TouchableOpacity>
      </Camera>
      <View style={styles.textDownloadContainer}>
        <Text style={styles.downloadText}>Загрузить фото</Text>
      </View>
      <View style={styles.inputNameWrapper}>
        <TextInput
          style={styles.inputName}
          placeholder="Название..."></TextInput>
      </View>
      <View style={styles.inputLocationWrapper}>
        <TextInput
          style={styles.inputLocation}
          placeholder="Местность..."></TextInput>
        <TouchableOpacity style={styles.MapBtn}>
          <SimpleLineIcons
            style={styles.iconLocation}
            name="location-pin"
            size={24}
            color="#BDBDBD"
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.btnPublicationWrapper}
        onPress={sendPhoto}>
        <Text style={styles.btnPublicationText}>Опубликовать</Text>
      </TouchableOpacity>
      <View style={styles.btnDeleteWrapper}>
        <TouchableOpacity style={styles.btnDeleteWrapper}>
          <AntDesign name="delete" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
  },
  camera: {
    height: 300,
    marginTop: 70,
    backgroundColor: '#E8E8E8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnCamera: {
    backgroundColor: 'red',
    width: 60,
    height: 60,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  cameraIcon: {
    fill: '#BDBDBD',
  },
  textDownloadContainer: {
    marginTop: 8,
  },
  downloadText: {
    color: '#BDBDBD',
    fontFamily: 'Regular',
    fontSize: 16,
    lineHeight: 19,
    marginBottom: 32,
  },
  inputNameWrapper: {
    borderBottomWidth: 1,
    borderBottomColor: '#BDBDBD',
    paddingTop: 15,
    paddingBottom: 15,
    marginBottom: 16,
  },
  inputLocationWrapper: {
    position: 'relative',
    borderBottomWidth: 1,
    borderBottomColor: '#BDBDBD',
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 30,
    marginBottom: 32,
  },
  MapBtn: {
    position: 'absolute',
    bottom: 12,
    left: 0,
  },
  btnPublicationWrapper: {
    height: 51,
    backgroundColor: '#FF6C00',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnPublicationText: {
    color: '#fff',
    fontSize: 16,
    lineHeight: 19,
  },
  btnDeleteWrapper: {
    width: 70,
    height: 40,
    backgroundColor: '#BDBDBD',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 'auto',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  takePhotoContainer: {
    borderWidth: 1,
    borderColor: '#fff',
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: '#BDBDBD',
  },
})

export default CreatePostsScreen
