const express = require('express');
const app = express();

app.get('', (req, res) => {
  res.send(`
    <h1>Welcome, this is a Home Page</h1>
    <a href="/about">About Page</a>
    <a href="/help?name=Jenish">Help Page</a>
    `);
});

app.get('/about', (req, res) => {
  res.send(`
    <h1>Welcome, this is a About Page</h1>
    <a href="/">Home Page</a>
    `);
});

app.get('/help', (req, res) => {
  res.send(`
    <input type="text" value="${req.query.name}" />
    <a href="/">Home Page</a>
    `);
});
app.get('/data', (req, res) => {
  res.send(`Welcome ${req.query.name}, this is a Data Sending Page`);
  //http://localhost:5000/data?name=Jenish
  console.log(`Data sent by Browser ->>> `, req);
  console.log(`Data sent by Browser ->>> `, req.query);
  console.log(`Data sent by Browser ->>> `, req.query.name);
});

app.listen(5000);
