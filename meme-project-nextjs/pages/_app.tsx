import App, { AppContext, AppProps } from "next/app";
import { useEffect } from "react";

import '../styles/globals.css'

import { Header } from "../components/Header";

function MyApp({ Component, pageProps, router }: AppProps) {

  useEffect(() => {
    console.log("router", router);
  }, [])

  return (
    <div className="root-app">
      <Header />
      <Component {...pageProps} />
    </div>
  )
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext);

  return {
    pageProps: {
      ...appProps.pageProps
    }
  }
}

export default MyApp
