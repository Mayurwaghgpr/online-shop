const path= require('path');
const express = require('express');
const bodyParser = require ('body-parser');

const port = 3000;
const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const admindata = require('./routes/admin');
const ShopRouter = require('./routes/shop');
const { Page404 } = require('./controllers/Page404');

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"public")));

app.use('/admin',admindata);
app.use(ShopRouter);

app.use(Page404);

app.listen(port,()=>{
    console.log("Listening on port",port);
});