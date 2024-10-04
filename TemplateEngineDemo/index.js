const express = require('express');
const path = require('path');

const app = express();
const publicPath = path.join(__dirname, '/public');

app.set('view engine', 'ejs');

app.get('/profile', (req, res) => {
  const user = {
    name: 'Jenish Dayani',
    age: 22,
    occupation: 'Software Engineer',
    hobbies: ['Reading', 'Hiking', 'Coding'],
    address: {
      street: '56, Happy Homes',
      city: 'Surat',
      state: 'Gujarat',
    },
  };

  res.render('profile', { user });
});

app.get('/login',(req,res)=>{
 res.render('login');
})

app.listen(5000);
