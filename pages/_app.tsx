import "../styles/globals.css";
import { Provider } from "react-redux";
import { useStore } from "../store";
import AuthProvider from "../context/auth";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

const config = {
  useSystemColorMode: false,
  initialColorMode: "dark",
};
// 3. extend the theme
const customTheme = extendTheme({ config });
export default function App({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState);
  const persistor = persistStore(store, {}, function () {
    persistor.persist();
  });
  return (
    <AuthProvider>
      <Provider store={store}>
        <ChakraProvider theme={customTheme}>
          <PersistGate loading={<div>loading</div>} persistor={persistor}>
            <Component {...pageProps} />
          </PersistGate>
        </ChakraProvider>
      </Provider>
    </AuthProvider>
  );
}
