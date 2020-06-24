import * as Router from 'koa-router';
import { leaderboardsStorage } from './leaderboards-storage';

const leaderboardsRouter = new Router()

leaderboardsRouter
    .get('/leaderboards', (context) => {
        const leaderboards = leaderboardsStorage.getAll();

        context.body = {
            result: leaderboards
        }
    });

export {leaderboardsRouter};