import "../styles/global.scss"
import { AuthContextProvider } from "../authContext/AuthContext";

function MyApp({ Component, pageProps }) {
  return (
    <AuthContextProvider>
        <Component {...pageProps} />
    </AuthContextProvider>
  )
}

export default MyApp
