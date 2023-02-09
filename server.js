import Koa from 'koa';
import Router from 'koa-router';
import respond from 'koa-respond';
import bodyParser from 'koa-bodyparser';
import studentRoutes from './api/routes/studentRoutes';
import carRoutes from "./api/routes/carRoutes"


const port = 3000;
const app = new Koa();
const router = Router();


app.use(bodyParser());
app.use(respond());

studentRoutes(router);
carRoutes(router);

app.use(router.routes())
        .use(router.allowedMethods());

app.listen(port);

console.log(`Listening on ${port}`);

export default app.listen();