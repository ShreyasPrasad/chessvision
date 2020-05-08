import { GetState } from '../../reducers/game/types';

export const APPLY_MOVE = 'APPLY_MOVE';

export const applyMove = (payload: string) => ({ type: APPLY_MOVE, payload });

