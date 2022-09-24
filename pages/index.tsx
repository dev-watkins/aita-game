import type { NextPage} from 'next'
import Head from 'next/head'
import Link from 'next/link';
import styles from '../styles/Home.module.css'


const Home: NextPage = () => {
   return (
    <div className={styles.container}>      
      <Head>
        <title>r/AmITheAsshole The Game</title>
      </Head>
      <main className={styles.main}>
        <div>
          <h1>r/AmITheA**hole</h1>
          <h2>The Game</h2>
          <p>The guessing game that puts you against the people of <a href="https://www.reddit.com/r/AmItheAsshole/">r/AmITheAsshole</a>. Guess the official judgment on random posts. Sign in to keep track of your progress.</p>
          <Link href="/play">
           <a className='btn solid secondary'>PLAY</a>
          </Link>
        </div>      
      </main>      
    </div>
  )
}


export default Home
