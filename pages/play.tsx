import { useState } from 'react';
import type { NextPage, GetServerSideProps } from 'next';
import Head from 'next/head';
import sanitizeHtml from 'sanitize-html';
import { AnswerPanel } from '../lib/react/components/answerPanel';
import styles from '../styles/Play.module.css';
import { fetchRandomAITAPost } from '../lib/fetchRandomAITAPost';
import { IPost } from '../lib/types/IPost';


const Play: NextPage<{props:IPost}> = ({props}) => {
  const [post, setPost] = useState({
    ...props
  })

  const next = async () => {
    const newPost = await fetchRandomAITAPost();
    setPost({
      ...newPost
    })
  }
  
  const sanitize = (dirty: string) => ({
    __html: sanitizeHtml(
      dirty,
    )
  });
  return (
    <div className={styles.container}>      
      <Head>
        <title>r/AmITheAsshole The Game | {post.title} </title>
      </Head>
      <main className={styles.main} >
        {!post.body?(
          <div className={styles.badPost}>
            <h1>Oops, Reddit gave us a bad post. Hit NEXT to get a new one.</h1>
            <button onClick={next} className='solid primary'>NEXT</button>
          </ div>
        ):(
          <>
            <h1>{post.title}</h1>
            <AnswerPanel post={post} next={next}/>
            <div dangerouslySetInnerHTML={sanitize(post.body)}/>
            <button onClick={next} className='solid secondary'>SKIP</button>
          </>
        )}
        
      </main>      
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const data =  await fetchRandomAITAPost();
  
  return {
    props: {
      props:{
        ...data
      }
    }, // will be passed to the page component as props
  }
}

export default Play
