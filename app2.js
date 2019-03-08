const Koa = require('koa')
const app = new Koa()

app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.get('eggs');
  console.log(`${ctx.method} ${ctx.url} - ${rt}`);
});

// x-response-time

app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set('eggs', `${ms}ms`);
});

// response

app.use(async ctx => {
  ctx.body = ctx.response
});

app.listen(3000)