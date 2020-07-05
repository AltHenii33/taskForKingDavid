import '../styles/global.css'
import BoxCon from '../components/box'
import { CurrentUserProvider } from '../context/context'
import { ThemeProvider } from '@material-ui/core'
import theme from '../components/theme'

export default function App({ Component, pageProps }) {
  return (
    <CurrentUserProvider>
      <ThemeProvider theme={theme}>
      <BoxCon
        children={<Component {...pageProps} />}
      />
      </ThemeProvider>
    </CurrentUserProvider>
  )
}