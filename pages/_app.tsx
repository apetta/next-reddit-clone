import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import Header from '../components/Header'
import { ApolloProvider } from '@apollo/client'
import client from '../apollo-client'
import { Toaster } from 'react-hot-toast'
import Head from 'next/head'

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <SessionProvider session={session}>
        <Head>
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=0.8"
          />
          <title>Reddit Clone</title>
          <link rel="icon" href="/reddit-logo.svg" />
        </Head>
        <Toaster />
        <div className="h-full min-h-screen overflow-y-scroll bg-slate-200 min-w-fit">
          <Header />
          <Component {...pageProps} />
        </div>
      </SessionProvider>
    </ApolloProvider>
  )
}

export default MyApp
