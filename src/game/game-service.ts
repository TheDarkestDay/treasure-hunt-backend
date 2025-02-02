import { LeaderboardsStorage, leaderboardsStorage } from './../leaderboards/leaderboards-storage';
import { Point } from './point';
import { sessionStorage, SessionStorage } from './session-storage';
import { GameFieldFactory, gameFieldFactory } from './game-field-factory';
import { CheckFieldResult } from './check-fields-result';

export class GameService {
    constructor(private sessionStorage: SessionStorage, private gameFieldFactory: GameFieldFactory, private leaderboardsStorage: LeaderboardsStorage) {
    }

    createGame(name: string): string {
        const gameField = this.gameFieldFactory.createGameField();

        const newGameState = {
            turnsTaken: 0,
            foundTreasuresCount: 0,
            gameField,
        };

        this.sessionStorage.putValue(name, newGameState);
        return name;
    }

    checkFields(name: string, points: Point[]): CheckFieldResult[] {
        const {gameField, turnsTaken, foundTreasuresCount} = this.sessionStorage.getValue(name);

        const revealedFields: CheckFieldResult[] = [];
        let newlyFoundTreasures = 0;
        points.forEach(({x, y}) => {
            const cellContent = gameField.getCellContent(x, y);
            if (cellContent === 'T') {
                newlyFoundTreasures += 1;
            }

            revealedFields.push({
                x,
                y,
                content: cellContent,
            });
        });

        const totalTurns = turnsTaken + 1;
        const totalFoundTreasuresCount = foundTreasuresCount + newlyFoundTreasures;

        this.sessionStorage.putValue(name, {
            turnsTaken: totalTurns,
            foundTreasuresCount: totalFoundTreasuresCount,
            gameField,
        });

        if (totalFoundTreasuresCount === 3) {
            this.leaderboardsStorage.add({
                name,
                score: totalTurns
            });
        }

        return revealedFields;
    }
};

export const gameService = new GameService(sessionStorage, gameFieldFactory, leaderboardsStorage);