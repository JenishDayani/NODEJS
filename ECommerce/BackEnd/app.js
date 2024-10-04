require('dotenv/config');
require('./config');
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');

const categoriesRouter = require('./routers/categories');
const productsRouter = require('./routers/products');
const usersRouter = require('./routers/users');
const ordersRouter = require('./routers/orders');
const authJwt = require('./helpers/jwt');
const errorHandler = require('./helpers/error-handler');

const api = process.env.API_URL;

const app = express();

app.use(cors());
app.options('*', cors());
app.use(bodyParser.json());
app.use(morgan('tiny'));
app.use(authJwt);
app.use('/public/uploads', express.static(__dirname + '/public/uploads'));

app.use(errorHandler);

app.use(`${api}/categories`, categoriesRouter);
app.use(`${api}/products`, productsRouter);
app.use(`${api}/users`, usersRouter);
app.use(`${api}/orders`, ordersRouter);

app.listen(3000, () => {
  console.log('Your Project is running on Port :- 3000');
  console.log('http://localhost:3000');
});
