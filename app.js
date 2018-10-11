const Koa = require('koa');

const app = new Koa();

app.use(async ctx => ctx.body = 'Hello from Koa');

app.listen(3000, () => console.log('Server Started!'))