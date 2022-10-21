const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const user = require('./routes/user.route')
const product = require('./routes/product.router')
const order = require('./routes/order.routes')
const img = require('./image_uploade/img');
const payment = require('./payment');
const paypal = require('./paypal')

const PORT = process.env.PORT

const app = express();
app.use(cors());
app.use(express.json());

// app test work or not
app.get('/',async(req,res)=>{
    console.log("its-worked")
    res.json({status:'success'})
})
app.set("view engine","ejs"); 

const DB = process.env.DBurl
//console.log(DB)

//const DB = 'mongodb+srv://raj:raj123@cluster0.tcu7t.mongodb.net/Lenskart?retryWrites=true&w=majority'
// Database connection
mongoose.connect(DB,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(base=>{
    console.log('MongoDB connected...')
}).catch(err=>{
    console.log('err',err.message);
})


app.use('/user',user);
app.use('/product',product);
app.use('/order',order);
app.use('/img',img)
app.use('/pay',payment);
app.use('/paypal',paypal)

//running 8080 port
app.listen(PORT,()=>{
    console.log(`server started 8080 port..` )
})
console.log(PORT)


