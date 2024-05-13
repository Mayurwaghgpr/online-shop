const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
// const mongoConnect = require('./utils/database').mongoConnect;
const mongoose = require('mongoose');

const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const MONGODB_URI='mongodb+srv://mayur2002wagh:qjbtpZXw6911czns@mycluster.zrgz5rb.mongodb.net/shop'
const port = 3000;
const app = express();
const store = new MongoDBStore({
uri:MONGODB_URI,
collection:'sessions',

})

app.set('view engine', 'ejs');
app.set('views', 'views');
const authRoutes = require('./routes/auth');
const admindata = require('./routes/admin');
const ShopRouter = require('./routes/shop');
const { Page404 } = require('./controllers/Page404');
const User = require('./models/User');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(
    session({
        secret:'my secret',
        resave:false,
        saveUninitialized:false,
        store:store
    })
)
app.use((req,res,next)=>{
    if(!req.session.user){
        return next();
    }
 User.findById(req.session.user._id)
        .then(user => {
            req.user=user
            next()
        }).catch(err => {
            console.log(err);
        })
  
})


app.use('/admin', admindata);
app.use(ShopRouter);
app.use(authRoutes);
app.use(Page404);

mongoose.connect(MONGODB_URI)
    .then(result => {
        User.findOne().then(user => {
            if (!user) {
                console.log("connected")
                const user = new User({
                    name: 'mayurWagh',
                    email: 'mayur@wagh.com',
                    cart: {
                        item: []
                    }
                });
                user.save();
            }
        })

        app.listen(port, () => console.log("listening on port", port))
    }).catch(error => {
        console.log(error)
    })
