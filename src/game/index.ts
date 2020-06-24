import * as Router from 'koa-router';
import { gameService } from './game-service';

const gameRouter = new Router();

gameRouter
    .get('/fields', (context) => {
        
    })
    .post('/game', async (context) => {
        const { name } = context.request.body;
        const sessionId = await gameService.createGame(name);

        context.body = {
            sessionId
        };
    });


export { gameRouter };