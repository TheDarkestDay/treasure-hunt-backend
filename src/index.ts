import * as Koa from 'koa';
import * as koaQs from 'koa-qs';
import * as bodyParser from 'koa-bodyparser';
import { gameRouter } from './game';
import { leaderboardsRouter } from './leaderboards';

const app = koaQs(new Koa());

app.use(bodyParser());
app.use(gameRouter.routes());
app.use(leaderboardsRouter.routes());

app.listen(4000, () => {
    console.log(`Listening on port 4000`);
});

export {app}; 