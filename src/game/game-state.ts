import { GameField } from './game-field';

export interface GameState {
    exploredCellsCount: number;
    foundTreasuresCount: number;
    gameField: GameField;
};