import { LeaderboardsStorage } from './../src/leaderboards/leaderboards-storage';
import { GameFieldFactory } from './../src/game/game-field-factory';
import { SessionStorage } from './../src/game/session-storage';
import { GameService } from './../src/game/game-service';
import { GameField } from '../src/game/game-field';

describe('GameService', () => {
    let gameService: GameService;
    let sessionStorage: SessionStorage;
    let gameFieldFactory: GameFieldFactory;
    let leaderboardsStorage: LeaderboardsStorage;

    beforeEach(() => {
        sessionStorage = new SessionStorage();
        gameFieldFactory = new GameFieldFactory();
        leaderboardsStorage = new LeaderboardsStorage();
        gameService = new GameService(sessionStorage, gameFieldFactory, leaderboardsStorage);
    });

    it('should create a new game session and return a player name as a session ID', () => {
        spyOn(gameFieldFactory, 'createGameField').and.returnValue('Some game field');
        spyOn(sessionStorage, 'putValue').and.stub();
        const testName = 'John Doe';

        const sessionId = gameService.createGame(testName);

        expect(gameFieldFactory.createGameField).toHaveBeenCalled();
        expect(sessionStorage.putValue).toHaveBeenCalledWith(testName, {
            turnsTaken: 0,
            foundTreasuresCount: 0,
            gameField: 'Some game field'
        });
        expect(sessionId).toEqual(testName);
    });

    it('should perform a field check', () => {
        const sessionId = 'test';
        const pointsToReveal = [{x: 1, y: 1}, {x: 2, y: 3}, {x: 4, y: 2}];

        const gameFieldMock = new GameField();
        spyOn(gameFieldMock, 'getCellContent').and.callFake((x: number, y: number) => {
            if (x === 1 && y === 1) {
                return 'T'
            };

            if (x === 2 && y === 3) {
                return '2'
            };

            if (x === 4 && y === 2) {
                return '1';
            }
        });
        spyOn(sessionStorage, 'getValue').and.returnValue({
            turnsTaken: 0,
            foundTreasuresCount: 0,
            gameField: gameFieldMock,
        });

        const result = gameService.checkFields(sessionId, pointsToReveal);

        expect(result).toEqual([
            {x: 1, y: 1, content: 'T'},
            {x: 2, y: 3, content: '2'},
            {x: 4, y: 2, content: '1'}
        ]);
    });
});