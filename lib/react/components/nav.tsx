import { NextComponentType } from "next";
import {useEffect} from 'react';
import Link from 'next/link'
import { useSession, signIn, signOut } from "next-auth/react";
import { useScore } from '../hooks/useScore';

export const Nav: NextComponentType = () => {
  const { data: session } = useSession();
  const { score, winRatio } = useScore();

  return (
    <nav>
      <div className="peach"><a href="https://www.buymeacoffee.com/devwatkins" rel="noreferrer" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" style={{width: '175px !important'}} /></a></div>
      <div>
        <Link href='/'>
          <a className="home-link">            
            <div className="important">r/AmITheA**hole</div>
            <div>The Game</div>
          </a>
        </Link>
      </div>
      <div>
        <div className="nav-right-side">
          {
            session ? (
              <>
                <div className="score">
                  <div className="important">Score</div>
                  <div>{score}</div>
                </div>
                <div className="score">
                  <div className="important">Win Ratio</div>
                  <div>{winRatio}</div>
                </div>
                <div>
                  <div className="important">{session.user?.name}</div>
                  <div className="logout" onClick={() => signOut()}>Sign Out</div>
                </div>                
              </>
            ) : (
              <>
              <button className="outline secondary" onClick={() => signIn('google')} >Sign In With Google</button>
              </>
            )
          }
        </div>
      </div>
    </ nav>
  );
}