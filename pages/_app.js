import App, {Container} from 'next/app'
import React from 'react'
import NProgress from 'nprogress'
import Router from 'next/router'
import withGA from "next-ga"
import '../styles/index.scss'

if (typeof window !== "undefined") {
  NProgress.configure({ showSpinner: false });

  Router.onRouteChangeStart = () => {
    NProgress.start();
  };

  Router.onRouteChangeComplete = () => {
    NProgress.done();
  };

  Router.onRouteChangeError = () => {
    NProgress.done();
  };
}


class MyApp extends App {
  static async getInitialProps ({ Component, router, ctx }) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return {pageProps}
  }

  render () {
    const {Component, pageProps} = this.props
    return <Container>
      <Component {...pageProps} />
    </Container>
  }
}

let myApp;

if (process.env.NODE_ENV !== 'production'){
  console.log("Disable GA on develop mode");
  myApp = MyApp;
}else
  myApp = withGA("UA-47335528-2", Router)(MyApp);

 export default myApp;
