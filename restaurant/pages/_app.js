import Nav from "@/components/Nav";
import ProtectedRoute from "@/components/ProtectedRoute";
import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";

export default function App({ Component, pageProps: { ...pageProps } }) {
  return (
    <SessionProvider>
      <Nav />
      {/* <ProtectedRoute> */}
      <Component {...pageProps} />
      {/* </ProtectedRoute> */}
    </SessionProvider>
  );
}
