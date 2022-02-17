import "../styles/global.scss"
import { ContextProvider } from "../Context/Context";

function MyApp({ Component, pageProps }) {
  return (
    <ContextProvider>
        <Component {...pageProps} />
    </ContextProvider>
  )
}

export default MyApp
