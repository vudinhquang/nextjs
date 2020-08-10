import Head from 'next/head'
import App from "next/app";
import { AppContext, AppProps } from "next/app";
import { useEffect } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/css/style.css";

import { Header } from "../components/Header";

function MyApp({ Component, pageProps, router }: AppProps) {

  useEffect(() => {
    console.log("router", router);
  }, [])

  return (
    <div className="root-app">
      <Head>
        <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, minimum-scale=1, maximum-scale=1" />
        <meta name="keywords" content="HTML5 Template" />
        <meta name="description" content="Cộng đồng chế ảnh ZendVN" />
        <meta name="author" content="etheme.com" />
        <link rel="icon" href="/favicon.ico" />
        <title>Cộng đồng chế ảnh</title>
        <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700" rel="stylesheet" />
        <link rel="stylesheet" href="fonts/font-awesome/css/font-awesome.css" />
	      <link rel="stylesheet" href="fonts/emotion/style.css" />

        {/* JAVA SCRIPT */}
        {/* require */}
        {/*  */}
        {/* HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries */}
        {/*[if lt IE 9]>
        <![endif]*/}
      </Head>
      <Header/>
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
