const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/e_comm');

const ProductSchema = new mongoose.Schema({
  name: String,
  brand: String,
  price: Number,
  category: String,
});

const ProductModel = mongoose.model('products', ProductSchema);

const insertInDB = async () => {
  const data = new ProductModel({
    name: 'M40',
    brand: 'Samsung',
    price: 5500000,
    category: 'Mobile',
  });
  const result = await data.save();
  console.log(result);
};

const updateInDB = async () => {
  const data = await ProductModel.updateOne(
    { price: 5500000 },
    { $set: { price: 550 } }
  );
  console.log(data);
};

const deleteInDb = async () => {
  const data = ProductModel.deleteOne({ name: 'Max 8' });
  console.log(data);
};
