import Document, { Head, Main, NextScript } from 'next/document'

const theme_color = "#0D47A1";
const description = "Techนุกรม = ศูนย์กลางความรู้สำหรับนักพัฒนา ( developer) โดยที่เน้นภาษาไทยเป็นหลัก"

export default class MyDocument extends Document {
  render() {
    return (
      <html class="has-navbar-fixed-top" >
      <Head>
        <link rel="stylesheet" type='text/css' href="/_next/static/style.css" />
        <link rel='stylesheet' type='text/css' href='/static/css/nprogress.css' />
        <link rel='stylesheet' type='text/css' href='/static/css/Trirong.css' />

        <meta charset="utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no" />
        <meta name="description" content={description} />
        <meta name="keywords" content="IT, developer, programmer" />

        <link rel="apple-touch-icon" sizes="180x180" href="/static/icons/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/static/icons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/static/icons/favicon-16x16.png" />
        <link rel="manifest" href="/static/icons/site.webmanifest" />
        <link rel="mask-icon" href="/static/icons/safari-pinned-tab.svg" color={theme_color} />
        <link rel="shortcut icon" href="/static/icons/favicon.ico" />
        <meta name="apple-mobile-web-app-title" content="Technukrom" />
        <meta name="application-name" content="Technukrom" />
        <meta name="msapplication-TileColor" content={theme_color} />
        <meta name="msapplication-config" content="/static/icons/browserconfig.xml" />
        <meta name="theme-color" content={theme_color} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
      </html >
    )
  }
}
