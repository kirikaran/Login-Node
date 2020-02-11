const express =require('express');
const expressLayout=require('express-ejs-layouts');
const mongoose=require('mongoose');

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

//routes
app.use('/',require('./routes/index'));
app.use('/users',require('./routes/users'));
const PORT=process.env.PORT || 5000;
app.listen(PORT,console.log(`server started on port ${PORT}`));