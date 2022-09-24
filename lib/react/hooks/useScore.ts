import { useContext } from 'react';
import { ScoreContext, IScoreContext } from '../context/scoreContext';

export const useScore = (): IScoreContext =>
  useContext(ScoreContext) as IScoreContext;
