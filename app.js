const express =require('express');
const expressLayout=require('express-ejs-layouts');
const mongoose=require('mongoose');
const flash=require('connect-flash');
const session=require('express-session');

const app=express();

//DB config
const db=require('./config/keys').MongoURI;

//Connect to Mango
mongoose.connect(db,{useNewUrlParser:true})
.then(()=>console.log('mongoDb connected'))
.catch(err=>console.log(err));

//EJS
app.use(expressLayout);
app.set('view engine','ejs');


//Body parsers
app.use(express.urlencoded({extended:false}));

//Express Session
app.use(session({
    secret:'secret',
    resave:true,
    saveUninitialized:true
}));

//coonect flash
app.use(flash());

//Global Vars
app.use((req,res,next)=>{
    res.locals.success_msg=req.flash('success_msg');
    res.locals.error_msg=req.flash('error_msg');
    next();
});

//routes
app.use('/',require('./routes/index'));
app.use('/users',require('./routes/users'));
const PORT=process.env.PORT || 5000;
app.listen(PORT,console.log(`server started on port ${PORT}`));