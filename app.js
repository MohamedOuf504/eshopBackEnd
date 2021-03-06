const express = require('express')
const app = express()
const globalErrorHandler = require('./src/Controllers/errorController')
const AppError = require("./src/utility/appError");
const morgan = require('morgan')
const cors = require('cors')
const productsRouter = require('./src/Routes/product.route');
const CategoriesRouter = require('./src/Routes/categories.route');
const usersRouter = require('./src/Routes/users.route');
const ordersRouter = require('./src/Routes/orders.route');
const authJwt  = require('./src/utility/jwt');
const path =require('path')



app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(morgan('tiny'))
app.use(cors())
app.options('*', cors());

app.use(authJwt())
app.use('/public/uploads/',express.static(path.join(__dirname, '/public/uploads')));
app.use('/products', productsRouter)
app.use('/Categories' , CategoriesRouter)
app.use('/users' , usersRouter)
app.use('/orders' , ordersRouter)

app.get('/', (req, res) => { res.json({ message: 'it is work ' }) })
app.all("*", (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server`));
});
app.use(globalErrorHandler);


module.exports = app;
