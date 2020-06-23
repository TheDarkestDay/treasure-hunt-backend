import { Point } from './point';
import { sessionStorage, SessionStorage } from './session-storage';
import { GameFieldFactory, gameFieldFactory } from './game-field-factory';
import { CheckFieldResult } from './check-fields-result';

export class GameService {
    constructor(private sessionStorage: SessionStorage, private gameFieldFactory: GameFieldFactory) {
    }

    createGame(name: string): string {
        const gameField = this.gameFieldFactory.createGameField();

        const newGameState = {
            exploredCellsCount: 0,
            foundTreasuresCount: 0,
            gameField,
        };

        this.sessionStorage.putValue(name, newGameState);
        return name;
    }

    checkFields(name: string, points: Point[]): CheckFieldResult[] {
        const {gameField, exploredCellsCount, foundTreasuresCount} = this.sessionStorage.getValue(name);

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

        this.sessionStorage.putValue(name, {
            exploredCellsCount: exploredCellsCount + 3,
            foundTreasuresCount: foundTreasuresCount + newlyFoundTreasures,
            gameField,
        });

        return revealedFields;
    }
};

export const gameService = new GameService(sessionStorage, gameFieldFactory);