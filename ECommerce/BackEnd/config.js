const mongoose = require('mongoose');

mongoose
  .connect('mongodb://localhost:27017/e_com')
  .then(() => {
    console.log('Database Connection is ready...');
  })
  .catch((error) => {
    console.log('Error while connecting to database:', error);
  });
