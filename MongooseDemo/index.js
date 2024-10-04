const express = require('express');

require('./config');
const Product = require('./product');

const app = express();

app.use(express.json());

app.post('/create', async (req, res) => {
  const product = new Product(req.body);
  const result = await product.save();
  res.send(result);
});

app.get('/list', async (req, res) => {
  const products = await Product.find({});
  res.send(products);
});

app.put('/update/:_id', async (req, res) => {
  const data = await Product.updateOne(req.params, { $set: req.body });
  res.send(data);
});

app.delete('/delete/:_id', async (req, res) => {
  const data = await Product.deleteOne(req.params);
  res.send(data);
});

app.get('/search/:key', async (req, res) => {
  const regex = new RegExp(req.params.key, 'i');
  const data = await Product.find({
    $or: [{ name: regex }, { category: regex }, { brand: regex }],
  });
  res.send(data);
});

app.listen(5000);
