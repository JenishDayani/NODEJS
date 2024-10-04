const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();

const secretKey = 'secretkey';
app.get('/', (req, res) => {
  res.json({
    message: 'Sample API',
  });
});

app.post('/login', (req, res) => {
  const user = {
    id: 1,
    username: 'jenish',
    email: 'jenish@example.com',
  };
  jwt.sign({ user }, secretKey, { expiresIn: '300s' }, (err, token) => {
    res.json({
      token: token,
    });
  });
});

app.post('/profile', verifyToken, (req, res) => {
  jwt.verify(req.token, secretKey, (error, authData) => {
    if (error) {
      res.send({
        result: 'Invalid Token',
      });
    } else {
      res.json({
        message: 'profile accessed',
        authData,
      });
    }
  });
});

function verifyToken(req, res, next) {
  const bearerHeader = req.headers['authorization'];
  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
    // jwt.verify(bearerToken, secretKey, (err, user) => {
    // })
  } else {
    return res.status(403).send({ message: 'No token provided.' });
  }
}

app.listen(5000, () => {
  console.log(`App is Running on 5000 port`);
});
