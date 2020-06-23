import { GameFieldFactory } from './../src/game/game-field-factory';
import { SessionStorage } from './../src/game/session-storage';
import { GameService } from './../src/game/game-service';


describe('GameService', () => {
    let gameService: GameService;
    let sessionStorage: SessionStorage;
    let gameFieldFactory: GameFieldFactory;

    beforeEach(() => {
        sessionStorage = new SessionStorage();
        gameFieldFactory = new GameFieldFactory();
        gameService = new GameService(sessionStorage, gameFieldFactory);
    });

    it('should create a new game session and return a player name as a session ID', () => {
        spyOn(gameFieldFactory, 'createGameField').and.returnValue('Some game field');
        spyOn(sessionStorage, 'putValue').and.stub();
        const testName = 'John Doe';

        const sessionId = gameService.createGame(testName);

        expect(gameFieldFactory.createGameField).toHaveBeenCalled();
        expect(sessionStorage.putValue).toHaveBeenCalledWith(testName, {
            exploredCellsCount: 0,
            foundTreasuresCount: 0,
            gameField: 'Some game field'
        });
        expect(sessionId).toEqual(testName);
    });
});