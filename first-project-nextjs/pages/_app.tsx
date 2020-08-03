import React from "react";
import Head from "next/head";
import { AppProps } from "next/app";
import "../assets/style.scss";

/*
export default class MyApp extends React.Component<AppProps> {

  render() {
    return (
      <div className="root-app">
        <Head>
          <title>Create Next App</title>
          <link rel="icon" href="/favicon.ico" />
          <link rel="stylesheet" href="/css/global.css" />
        </Head>
        <this.props.Component {...this.props.pageProps} />
      </div>
    )
  }
}
*/

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <div className="root-app">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="/css/global.css" />
      </Head>
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp

/*
function MyApp({ Component, pageProps }) {
  // Component -> Dai dien cho 1 Page match url 

  return (
    <div className="root-app">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="/css/global.css" />
      </Head>
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp
*/