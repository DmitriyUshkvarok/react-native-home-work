import { useFonts } from 'expo-font'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import Main from './Components/Main'

export default function App() {
  const [fontsLoaded] = useFonts({
    Regular: require('./assets/fonts/Roboto-Regular.ttf'),
    Medium: require('./assets/fonts/Roboto-Medium.ttf'),
    Bold: require('./assets/fonts/Roboto-Bold.ttf'),
  })

  if (!fontsLoaded) {
    return null
  }
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  )
}
