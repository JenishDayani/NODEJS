const express = require('express');
const reqFilter = require('./middleware');

const route = express.Router(); // Use while applying the middleware to the Group of Route

const app = express();

// Application Middleware (Apply to all the routes)

/*app.use(reqFilter);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/users', (req, res) => {
  res.send('Welcome to Users Page!');
});

app.get('/about', (req, res) => {
  res.send('Welcome to About Page!');
});*/

// Route Middleware (Apply only in that route that you want)

/*app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/users', reqFilter, (req, res) => {
  res.send('Welcome to Users Page!');
});

app.get('/about', reqFilter, (req, res) => {
  res.send('Welcome to About Page!');
});*/

// Apply Middleware to the group of route

route.use(reqFilter);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/users', (req, res) => {
  res.send('Welcome to Users Page!');
});

route.get('/about', (req, res) => {
  res.send('Welcome to About Page!');
});

route.get('/contact', (req, res) => {
  res.send('Welcome to Contact Page!');
});

app.use('/', route);

app.listen(5000);
