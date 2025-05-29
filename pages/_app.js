import { ToastContainer } from "react-toastify";
import dynamic from "next/dynamic";

import NeedsProvider from "@/context/NeedsContext";

import "@/styles/globals.css";
import "@/styles/fonts.css";

const UserProvider = dynamic(() => import("@/context/UserContext"), {
  ssr: false,
});

export default function App({ Component, pageProps }) {
  return (
    <NeedsProvider>
      <UserProvider>
        <Component {...pageProps} />
        <ToastContainer />
      </UserProvider>
    </NeedsProvider>
  );
}
