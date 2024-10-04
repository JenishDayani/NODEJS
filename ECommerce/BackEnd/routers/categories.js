const express = require('express');
const Category = require('../models/category');

const router = express.Router();

router.get('/', async (req, res) => {
  const categoryList = await Category.find({});
  if (!categoryList) {
    res.status(500).json({ success: false });
  } else {
    res.status(200).send(categoryList);
  }
});

router.get('/:id', async (req, res) => {
  const id = req.params.id;
  const category = await Category.findById(id);
  if (!category) {
    res
      .status(500)
      .json({ message: 'The Category with the given ID was not found' });
  }
  res.status(200).send(category);
});

router.post('/', async (req, res) => {
  const category = new Category({
    name: req.body.name,
    icon: req.body.icon,
    color: req.body.color,
  });
  await category.save();
  if (!category) {
    res.status(404).send('The Category cannot be created');
  } else {
    res.send(category);
  }
});

router.put('/:id', async (req, res) => {
  const id = req.params.id;
  const category = await Category.findOneAndUpdate(
    { _id: id },
    {
      name: req.body.name,
      icon: req.body.icon,
      color: req.body.color,
    },
    { new: true }
  );

  if (!category) {
    return res.status(400).send(`The Category can'not be Updated`);
  } else {
    res.send(category);
  }
});

router.delete('/:id', (req, res) => {
  Category.findByIdAndDelete(req.params.id)
    .then((category) => {
      if (category) {
        return res
          .status(200)
          .json({ success: true, message: 'The Category Deleted' });
      } else {
        return res
          .status(404)
          .json({ success: false, message: 'The Category Not Found' });
      }
    })
    .catch((error) => {
      return res.status(500).json({ success: false, message: error });
    });
});

module.exports = router;
