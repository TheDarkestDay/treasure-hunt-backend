import * as Router from 'koa-router';
import { gameService } from './game-service';

const gameRouter = new Router();

gameRouter
    .get('/field', (context) => {
        const {sessionId, points: rawPoints} = context.query;
        const parsedPoints = rawPoints.map((rawPoint: string) => JSON.parse(rawPoint));

        const checkResult = gameService.checkFields(sessionId, parsedPoints);

        context.body = {
            result: checkResult
        };
    })
    .post('/game', async (context) => {
        const { name } = context.request.body;
        const sessionId = await gameService.createGame(name);

        context.body = {
            sessionId
        };
    });


export { gameRouter };