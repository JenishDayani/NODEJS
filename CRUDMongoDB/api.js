const express = require('express');
const mongoDB = require('mongodb');
const dbConnect = require('./mongodb');

const app = express();
app.use(express.json());

app.get('/', async (req, res) => {
  const db = await dbConnect();
  const data = await db.find({}).toArray();
  res.send(data);
});

app.post('/', async (req, res) => {
  const db = await dbConnect();
  const result = await db.insertOne(req.body);
  res.send(result);
});

app.put('/:name', async (req, res) => {
  const db = await dbConnect();
  const result = await db.updateOne(
    { name: req.params.name },
    { $set: req.body }
  );
  res.send({ result: 'update' });
});

app.delete('/:id', async (req, res) => {
  const db = await dbConnect();
  const result = await db.deleteOne({
    _id: new mongoDB.ObjectId(req.params.id),
  });
  res.send({ message: `Item deleted Successfully` });
});

app.listen(5000);
