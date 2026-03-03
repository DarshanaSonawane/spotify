const express=require('express');
const cookieparser=require('cookie-parser');
const app=express();





app.use(express.json());
app.use(cookieparser());


const authroutes=require('../routes/auth.routes');
const musicroutes=require('../routes/music.routes');
app.use('/api/auth', authroutes);
app.use('/api/music',musicroutes);

module.exports=app;