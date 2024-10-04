const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');

const FILE_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpeg',
  'image/jpg': 'jpg',
};

const router = express.Router();

const Product = require('../models/product');
const Category = require('../models/category');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const invalid = FILE_TYPE_MAP[file.mimetype];
    let uploadError = new Error('Invalid Image Type');
    cb(null, 'public/uploads');
    if (isValid) {
      uploadError = null;
    }
  },
  filename: function (req, file, cb) {
    const uniqueName =
      file.originalname.split(' ').join('-') +
      Date.now() +
      '-' +
      Math.round(Math.random() * 1e9);
    const extension = FILE_TYPE_MAP[file.mimetype];
    cb(null, `${uniqueName}.${extension}`);
  },
});

const uploadOptions = multer({ storage: storage });

router.get(`/`, async (req, res) => {
  let filters = {};
  if (req.query.category) {
    filters = { category: req.query.category.split(',') };
  }
  const productList = await Product.find(filters).select('name image');
  if (!productList) {
    res.status(500).json({ success: false });
  }
  res.send(productList);
});

router.get('/:id', async (req, res) => {
  const productID = req.params.id;
  const product = await Product.findById(productID).populate('category');

  if (!product) {
    return res
      .status(404)
      .json({ success: false, message: 'Product Not Found' });
  } else {
    return res.json(product);
  }
});

router.post(`/`, uploadOptions.single('image'), async (req, res) => {
  const category = await Category.findById(req.body.category);

  if (!category) {
    return res.status(400).send('Invalid Category');
  }
  const fileName = req.file.filename;
  const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`;
  const product = new Product({
    name: req.body.name,
    description: req.body.description,
    richDescription: req.body.richDescription,
    image: `${basePath}${fileName}`,
    brand: req.body.brand,
    price: req.body.price,
    category: req.body.category,
    countInStock: req.body.countInStock,
    rating: req.body.rating,
    numReviews: req.body.numReviews,
    isFeatured: req.body.isFeatured,
  });

  const createdProduct = await product.save();
  if (!createdProduct) {
    res.status(500).json({
      success: false,
      error: `Product not Created`,
    });
  } else {
    res.status(201).json(createdProduct);
  }
});

router.put('/:id', async (req, res) => {
  const id = req.params.id;

  // if (mongoose.isValidObjectId(id)) {
  //   res.send('Invalid Product ID');
  // }

  const category = await Category.findById(req.body.category);

  if (!category) {
    return res.status(400).send('Invalid Category');
  }

  const product = await Product.findOneAndUpdate(
    { _id: id },
    {
      name: req.body.name,
      description: req.body.description,
      richDescription: req.body.richDescription,
      image: req.body.image,
      brand: req.body.brand,
      price: req.body.price,
      category: req.body.category,
      countInStock: req.body.countInStock,
      rating: req.body.rating,
      numReviews: req.body.numReviews,
      isFeatured: req.body.isFeatured,
    },
    { new: true }
  );

  if (!product) {
    return res.status(400).send(`The Product can'not be Updated`);
  } else {
    res.send(product);
  }
});

router.delete('/:id', (req, res) => {
  Product.findByIdAndDelete(req.params.id)
    .then((product) => {
      if (product) {
        return res
          .status(200)
          .json({ success: true, message: 'The Product Deleted' });
      } else {
        return res
          .status(404)
          .json({ success: false, message: 'The Product Not Found' });
      }
    })
    .catch((error) => {
      return res.status(500).json({ success: false, message: error });
    });
});

router.get('/get/count', async (req, res) => {
  const productCount = await Product.countDocuments();

  if (!productCount) {
    res.status(500).json({ success: false });
  } else {
    res.json({ productCount: productCount });
  }
});

router.get('/get/featured/:count', async (req, res) => {
  const count = req.params.count ? req.params.count : 0;
  const featuredProduct = await Product.find({ isFeatured: true }).limit(
    +count
  );

  if (!featuredProduct) {
    res.status(500).json({ success: false });
  } else {
    res.json(featuredProduct);
  }
});

router.put(
  '/gallery-images/:id',
  uploadOptions.array('images', 10),
  async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).send('Invalid Product ID');
    }
    const files = req.files;
    let imagesPaths = [];
    const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`;
    if (files) {
      files.forEach((file) => {
        imagesPaths.push(`${basePath}${file.fileName}`);
      });
    }
    const product = await Product.findOneAndUpdate(
      { _id: req.params.id },
      {
        images: imagesPaths,
      },
      {
        new: true,
      }
    );

    if (!product) {
      return res.status(500).send('The Product cannot be updated!');
    }
    res.send(product);
  }
);
module.exports = router;
