import Head from 'next/head'
import App from "next/app";
import { AppContext, AppProps } from "next/app";
import { useMemo, useEffect } from "react";
import es6Promise from "es6-promise";
import cookie from "cookie";

import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/css/style.css";

import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { parseJwt } from '../helpers';
import userService from '../services/userService';
import { useGlobalState } from "../state";

es6Promise.polyfill();

function MyApp({ Component, pageProps, router }: AppProps) {
  const pathname = router.pathname;
  const [currentUser, setCurrentUser] = useGlobalState("currentUser");

  useMemo(() => {
    console.log("Chay mot lan duy nhat phia server side");
    // Chay 1 lan duy nhat khoi tao global state
    setCurrentUser(pageProps.userInfo);
  }, []);

  const hiddenFooter = useMemo(() => {
    const excluded = [ '/', '/posts/[postId]' ];
    const currentRouter = pathname;

    return excluded.indexOf(currentRouter) !== -1;
  }, [pathname])

  const hiddenHeader = useMemo(() => {
    const excluded = [ '/login', '/register' ];
    const currentRouter = pathname;

    return excluded.indexOf(currentRouter) !== -1;
  }, [pathname]);

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
        <link rel="stylesheet" href="/fonts/font-awesome/css/font-awesome.css" />
	      <link rel="stylesheet" href="/fonts/emotion/style.css" />

        {/* JAVA SCRIPT */}
        {/* require */}
        {/*  */}
        {/* HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries */}
        {/*[if lt IE 9]>
        <![endif]*/}
      </Head>
      { !hiddenHeader && <Header /> }
      <main>
        <Component {...pageProps} />
      </main>
      { !hiddenFooter && <Footer /> }
    </div>
  )
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  let userRes = null;
  const appProps = await App.getInitialProps(appContext);

  if(typeof window === "undefined") {
    // SSR
    const cookieStr = appContext.ctx.req.headers.cookie || '';
    const token = cookie.parse(cookieStr).token;
    const userToken = parseJwt(token);
    
    if(userToken && userToken.id) {
      // Co ton tai user id -> Call API lay thong tin userId
      userRes = await userService.getUserById(userToken.id);
    }
  }

  return {
    pageProps: {
      ...appProps.pageProps,
      userInfo: userRes && userRes.user
    }
  }
}

export default MyApp
