import "../styles/globals.css";
import { Provider } from "react-redux";
import { useStore } from "../store";
import "../styles/globals.css";

import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

const config = {
  useSystemColorMode: false,
  initialColorMode: "dark",
};
// @ts-ignore
const customTheme = extendTheme({ config });
export default function App({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState);
  const persistor = persistStore(store, {}, function () {
    persistor.persist();
  });
  return (
    <Provider store={store}>
      <ChakraProvider theme={customTheme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </Provider>
  );
}
