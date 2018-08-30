import Document, { Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  render() {
    return (
      <html class="has-navbar-fixed-top">
        <Head>
        <link rel="stylesheet" type='text/css' href="/_next/static/style.css" />
          <link rel='stylesheet' type='text/css' href='/static/css/nprogress.css' />
          <link rel='stylesheet' type='text/css' href='/static/css/Trirong.css' />
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
          <meta name="theme-color" content="#0D47A1" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
