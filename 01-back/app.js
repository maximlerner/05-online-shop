const express = require('express');
const cors = require('cors');

const AppError = require('./Utils/appError')
const globalErrorHandler = require('./Controllers/errorController');

const userRouter = require('./Routes/userRoutes');
const productRouter = require('./Routes/productRoutes');
const deliveryRouter = require('./Routes/deliveryRoutes');
const cartRouter = require('./Routes/cartRoutes');
const cartItemRouter = require('./Routes/cartItemRoutes');

const app = express();
app.use(cors())

//Body parser, reading data from body into req.body
app.use(express.json({limit: '10kb'}));

app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
  });

// 3) Routes

app.use('/api/users', userRouter);
app.use('/api/products', productRouter);
app.use('/api/deliveries', deliveryRouter);
app.use('/api/carts', cartRouter);
app.use('/api/cartItems', cartItemRouter);

app.all('*',(req,res,next) => {
    next(new AppError(`Cant find ${req.originalUrl} on this server! `,404));
})



app.use(globalErrorHandler);

module.exports = app;

