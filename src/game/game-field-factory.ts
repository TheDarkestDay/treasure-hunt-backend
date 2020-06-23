import { GameField } from './game-field';
import { getRandomNumber } from '../utils';

export class GameFieldFactory {
    private readonly TREASURES_COUNT = 3;

    createGameField(): GameField {
        const field = new GameField();

        for (let i = 0; i < this.TREASURES_COUNT; i++) {
            let randomI = getRandomNumber(0, field.getSize());
            let randomJ = getRandomNumber(0, field.getSize());

            while (field.isCellFilled(randomI, randomJ)) {
                randomI = getRandomNumber(0, field.getSize());
                randomJ = getRandomNumber(0, field.getSize());
            };
            field.setCellContent(randomI, randomJ, 'T');

            const maxProximityPoints = [
                [randomI - 1, randomJ],
                [randomI, randomJ + 1],
                [randomI + 1, randomJ],
                [randomI, randomJ - 1]
            ];

            maxProximityPoints
                .filter(([x, y]) => !!field.getCellContent(x, y))
                .forEach(([x, y]) => {
                    field.setCellContent(x, y, '3');
                });

            const diagonalProximityPoints = [
              [randomI - 1, randomJ - 1],
              [randomI - 1, randomJ + 1],
              [randomI + 1, randomJ + 1],
              [randomI + 1, randomJ - 1]  
            ];
            
            diagonalProximityPoints
                .filter(([x, y]) => !!field.getCellContent(x, y))
                .forEach(([x, y]) => {
                    field.setCellContent(x, y, '2');
                });
        }

        for (let i = 0; i < field.getSize(); i++) {
            for (let j = 0; j < field.getSize(); j++) {
                if (!field.isCellFilled(i, j)) {
                    field.setCellContent(i, j, '1');
                }
            }
        }

        return field;
    }
};

export const gameFieldFactory = new GameFieldFactory();