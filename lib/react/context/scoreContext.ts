import { createContext, Dispatch, SetStateAction } from 'react';

export interface IScoreContext {
  score: number | undefined;
  setScore: Dispatch<SetStateAction<number | undefined>>;
  winRatio: number | undefined;
  setWinRatio: Dispatch<SetStateAction<number | undefined>>;
}

export const ScoreContext = createContext<IScoreContext | null>(null);
