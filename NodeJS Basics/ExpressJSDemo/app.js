const express = require('express');

const app = express();

app.use((req, res, next) => {
  console.log('I am in a MiddleWare');
  next();
});

app.use((req, res, next) => {
  console.log('I am in another MiddleWare');
  res.send('<h1>Hello from ExpressJS !</h1>');
});

app.listen(4000);
