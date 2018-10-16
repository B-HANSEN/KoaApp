const Koa = require('koa');
const json = require('koa-json');
const path = require('path');
const Router = require('koa-router');
const render = require('koa-ejs');
const app = new Koa();
const router = new Router();

// Json prettier middleware
app.use(json());

render(app, {
  root: path.join(__dirname, 'views'),
  layout: 'template',
  viewExt: 'html',
  cache: false,
  debug: false
});

router.get('/', async ctx => {
  await ctx.render('index', { title: 'My index page ;)'});
})

router.get('/contact', async ctx => {
  await ctx.render('contact');
})

router.get('/koa', (ctx, next) => ctx.body = { msg: 'Hello from Koa!' });

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(3000, () => console.log('Server Started!'))