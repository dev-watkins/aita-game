import { useState, useEffect, FC, ReactNode } from 'react';
import { useSession } from "next-auth/react";
import { ScoreContext } from '../context/scoreContext';

export const ScoreProvider:FC<{children: ReactNode}> = (props) => {
  const [score, setScore] = useState<number|undefined>();
  const [winRatio, setWinRatio] = useState<number|undefined>();
  const { data: session } = useSession();

  useEffect(()=>{
    const fetchData = async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_HOST || 'http://localhost:3000'}/api/score`);
      const data = await response.json();
      setScore(data.score);
      setWinRatio(data.winRatio)
    };
    if(session) fetchData();
  },[session, setScore, setWinRatio])

  return (
    <ScoreContext.Provider value={{score, setScore, winRatio, setWinRatio}}>
      {props.children}  
    </ ScoreContext.Provider>
  )
}