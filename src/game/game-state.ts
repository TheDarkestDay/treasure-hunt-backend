import { GameField } from './game-field';

export interface GameState {
    turnsTaken: number;
    foundTreasuresCount: number;
    gameField: GameField;
};