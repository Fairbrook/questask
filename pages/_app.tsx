import { store } from "@/app/redux";
import "@/styles/globals.css";
import localforage from "localforage";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";

localforage.config();
export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}
