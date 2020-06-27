const Koa = require('koa');
const json = require('koa-json');
const path = require('path');
const KoaRouter = require('koa-router');
const render = require('koa-ejs');
const bodyParser = require('koa-bodyparser');

const app = new Koa();
const router = new KoaRouter();

// Json prettier middleware
app.use(json());

// Bodyparser middleware
app.use(bodyParser());

// add additional properties to context; could be used in context of authentication etc.
app.context.user = 'Mike';

// replace with database
const things = ['Kite surfing', 'Programming', 'Cycling', 'Swimming'];

// setup to work with templates
render(app, {
	root: path.join(__dirname, 'views'), // folder for template engine to look for template
	layout: 'layout', // wrap all views inserted here
	viewExt: 'html',
	cache: false,
	debug: false,
});

// routes
router.get('/', index);
router.get('/test', ctx => (ctx.body = `Hello ${ctx.user}`));
// example how to use parameters:
router.get('/test2/:name', ctx => (ctx.body = `Hello ${ctx.params.name}`));
router.get('/add', showAdd);
router.post('/add', add);
router.get('/koa', showKoa);

// list of things
async function index(ctx) {
	await ctx.render('index', { title: 'Things I like', things });
}

async function showAdd(ctx) {
	await ctx.render('add');
}

// add a thing
async function add(ctx) {
	const body = ctx.request.body;
	things.push(body.thing);
	ctx.redirect('/');
}
async function showKoa(ctx) {
	ctx.body = { msg: 'Hello from Koa!' };
}

app.use(router.routes()).use(router.allowedMethods());

app.listen(3000, () => console.log('Server Started!'));
