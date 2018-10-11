const Koa = require('koa');
const json = require('koa-json');

const Router = require('koa-router');

const app = new Koa();
const router = new Router();

// Json prettier middleware
app.use(json());

//default root
// app.use(async ctx => ctx.body = { msg: 'Hello from Koa' });

router.get('/koa', (ctx, next) => ctx.body = { msg: 'Hello from Koa!' });

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(3000, () => console.log('Server Started!'))