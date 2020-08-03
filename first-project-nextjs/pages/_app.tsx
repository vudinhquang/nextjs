import Head from "next/head";
import "../assets/style.scss";

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
