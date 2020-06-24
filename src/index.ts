import * as Koa from 'koa';
import * as bodyParser from 'koa-bodyparser';
import { gameRouter } from './game';

const app = new Koa();

app.use(bodyParser());
app.use(gameRouter.routes());

app.listen(4000, () => {
    console.log(`Listening on port 4000`);
});

export {app}; 