import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { SessionProvider} from "next-auth/react";
import { Nav } from '../lib/react/components/nav';
import { ScoreProvider } from '../lib/react/providers/scoreProvider';

function MyApp({ Component, pageProps: { session, ...pageProps} }: AppProps) {    
  return (
    <SessionProvider session={session}>
      <ScoreProvider>
        <Head>          
          <meta name="description" content="Guess the result of random r/amitheasshole posts." />
          <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🍑</text></svg>" />
        </Head>
        <Nav />
        <Component {...pageProps} />
      </ScoreProvider>
    </SessionProvider>
  )
}

export default MyApp
