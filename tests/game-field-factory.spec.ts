import { GameFieldFactory } from '../src/game/game-field-factory';

describe('GameFieldFactory', () => {
    let gameFieldFactory: GameFieldFactory;

    beforeEach(() => {
        gameFieldFactory = new GameFieldFactory();
    });

    it('should create a field with exact 3 treasures', () => {
        const gameField = gameFieldFactory.createGameField();

        const treasureCount = gameField.getCells()
            .filter((cellContent) => cellContent === 'T')
            .length;

        expect(treasureCount).toEqual(3);
    });

    it('should create a field without any unfilled cells', () => {
        const gameField = gameFieldFactory.createGameField();
        const unfilledElementsCount = gameField.getCells().filter((cellContent) => cellContent === '#').length;
        
        expect(unfilledElementsCount).toEqual(0);
    });
});