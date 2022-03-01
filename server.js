const express=require('express');
const cors=require('cors');
const assert=require('assert')
const cookieParser=require('cookie-parser');
const mongoose=require('mongoose');
const fileUpload=require('express-fileupload')

const PORT=Number(5000);
require('dotenv').config();

const db_prod=process.env.MONGO_PROD || require('./config.json').config.db_prod;
const db_dev=process.env.MONGO_DEV || require('./config.json').config.db_dev;


const app=express();
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(fileUpload({useTempFiles:true}))
app.use(cors());
app.use(cookieParser())

mongoose.Promise=global.Promise;
mongoose.connect(db_prod,{useNewUrlParser:true},err=>{
if(err) assert.deepEqual(err,null);
console.log('mongo db connected')
})

app.use('/auth',require('./route/userRoute'));
app.use('/api',require('./route/productRoute'))
app.use('/api',require('./route/imageRoute'))


app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}` )
})
