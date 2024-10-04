const express = require('express');
const con = require('./config');

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  con.query(`select * from users`, (error, result) => {
    if (error) {
      console.log(error);
      res.status(500).send('Error');
    } else {
      res.json(result);
    }
  });
});

app.post('/', (req, res) => {
  const data = req.body;
  con.query('Insert INTO users SET ?', data, (error, result, fields) => {
    if (error) {
      console.log(error);
      res.status(500).send('Error');
    } else {
      res.send(result);
    }
  });
});

app.put('/:name', (req, res) => {
  const data = [req.body.gender, req.body.age, req.params.name];
  con.query(
    'UPDATE users  SET gender =  ?, age = ? where name = ?',
    data,
    (error, result, fields) => {
      if (error) {
        console.log(error);
        res.status(500).send('Error');
      } else {
        res.send(result);
      }
    }
  );
});

app.delete('/:name', (req, res) => {
  con.query(
    `DELETE FROM users WHERE name ='${req.params.name}'`,
    (error, result, fields) => {
      if (error) {
        console.log(error);
        res.status(500).send('Error');
      } else {
        res.send(result);
      }
    }
  );
});

app.listen(5000);
