import { useState, MouseEvent, FC } from 'react';
import { useSession } from 'next-auth/react';
import { useScore } from '../hooks/useScore';
import type { IPost } from '../../types/IPost';
import styles from '../../../styles/Play.module.css';

export const AnswerPanel: FC<{post:IPost, next: ()=>{}}> = ({post, next}) => {
  const [answerState, setAnswerState] = useState('not-answered');
  const { data: session } = useSession();
  const { setScore, setWinRatio } = useScore();

  const answer = async (e: MouseEvent) =>{
    const target = e.target as HTMLButtonElement;
    if(session) {
      const res = await fetch(`${process.env.NEXT_PUBLIC_HOST || 'http://localhost:3000'}/api/answer`, {
        method: 'POST',
        headers:{
          'Content-Type': 'application/json'
        },
        body:JSON.stringify({postId: post.redditId, judgment: target.textContent})
      });
      const data = await res.json();

      setScore(data.score)
      setWinRatio(data.winRatio);
    }    
    if(target.textContent === post.judgment ){
      setAnswerState('correct');
    } else (setAnswerState('wrong'))
  }

  const reset = async() => {
    await next();
    setAnswerState('not-answered');
  }

  const display = () => {
    switch(answerState) {
      case 'correct':
        return (
          <div className={styles.answer}>
            <h2><span className={styles.correct}>CORRECT!</span> The official judgment was {post.judgment}</h2>
            <button onClick={reset} className='solid secondary'>Keep It Up, Next Post</button>
          </div>
        )
      case 'wrong':
        return (
          <div className={styles.answer}>
            <h2><span className={styles.wrong}>OOPS!</span> That was wrong. The official judgment was {post.judgment}</h2>
            <button onClick={reset} className='solid secondary'>Try again, Next Post</button>
          </div>
        )
      default:
        return(
          <div className={styles.options}>
            <button onClick={answer} className='outline primary'>Asshole</button>
            <button onClick={answer} className='outline secondary'>Not the A-hole</button>
            <button onClick={answer} className='outline tertiary'>Everyone Sucks</button>
            <button onClick={answer} className='outline quaternary'>No A-holes here</button>
          </div>
        )
    }
  }

  return (
    <>
      {display()}
    </>
  )
}
