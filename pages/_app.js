import { ToastContainer } from "react-toastify";

import "@/styles/globals.css";
import "@/styles/fonts.css";
import UserProvider from "@/context/UserContext";

export default function App({ Component, pageProps }) {
  return (
    <UserProvider>
      <Component {...pageProps} />
      <ToastContainer />
    </UserProvider>
  );
}
