const Koa = require('koa');
const json = require('koa-json');
const path = require('path');
const Router = require('koa-router');
const render = require('koa-ejs');
const app = new Koa();
const router = new Router();

// Json prettier middleware
app.use(json());


const names = ['Vito', 'Joe', 'Henry', 'Eddie', 'Leo'];

render(app, {
  root: path.join(__dirname, 'views'),
  layout: 'template',
  viewExt: 'html',
  cache: false,
  debug: false
});

router.get('/', index);
router.get('/contact', showContact);
router.get('/koa', showKoa);

async function index(ctx){
  await ctx.render('index', { title: 'My index page ;)', names });
}

async function showContact(ctx){
  await ctx.render('contact');
}

async function showKoa(ctx){
  ctx.body = { msg: 'Hello from Koa!' }
}

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(3000, () => console.log('Server Started!'))