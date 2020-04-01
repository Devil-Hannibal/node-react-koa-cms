const Koa=require('koa');
const router=require('koa-router')();
const bodyParser = require('koa-bodyparser');
const cors = require('koa2-cors');
const port=process.env.port||3000;

const app=new Koa();

router.get('/',async (ctx,next)=>{
    ctx.body = `<h1>表单</h1>
    <form action="/login" method="post">
        <p>Name: <input name="name" value="koa2"></p>
        <p>Password: <input name="password" type="password" value="765"></p>
        <p><input type="submit" value="Submit"></p>
    </form>`;

})
router.post ('/login',async (ctx,next)=>{
    console.log(ctx.response.body
        )
    ctx.body={
        code:ctx.response.status,
        result:ctx
    };
    
  

})
app.use(bodyParser());
app.use(cors());
app.use(router.routes()).use(router.allowedMethods());
app.listen(port,{},()=>{
    console.log(`server is running at http://127.0.0.1:${port}`)
})