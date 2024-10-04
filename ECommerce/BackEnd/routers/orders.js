const mongoose = require('mongoose');
const express = require('express');
const Order = require('../models/order');
const OrderItem = require('../models/order-item');

const router = express.Router();

router.get('/', async (req, res) => {
  const orderList = await Order.find()
    .populate({
      path: 'orderItems',
      populate: { path: 'product', populate: 'category' },
    })
    .populate('user', 'name')
    .exec();
  if (!orderList) {
    return res.status(500).json({ success: false });
  }
  return res.send(orderList);
});

router.post('/', async (req, res) => {
  const orderItemsIds = Promise.all(
    req.body.orderItems.map(async (orderItem) => {
      const newOrderItem = new OrderItem({
        product: new mongoose.Types.ObjectId(orderItem.product),
        quantity: +orderItem.quantity,
      });

      const newOrderItemCreated = await newOrderItem.save();
      return newOrderItemCreated._id;
    })
  );

  const orderItemsIdsResolved = await orderItemsIds;
  // console.log(orderItemsIdsResolved);

  const totalPrices = await Promise.all(
    orderItemsIdsResolved.map(async (orderItemDemo) => {
      const orderItem = await OrderItem.findById(orderItemDemo).populate(
        'product',
        'price'
      );
      const totalPrice = orderItem.product.price * orderItem.quantity;
      return totalPrice;
    })
  );

  const totalPrice = totalPrices.reduce((a, b) => a + b, 0);

  const order = new Order({
    orderItems: orderItemsIdsResolved,
    shippingAddress1: req.body.shippingAddress1,
    shippingAddress2: req.body.shippingAddress2,
    city: req.body.city,
    zip: req.body.zip,
    country: req.body.country,
    phone: req.body.phone,
    status: req.body.status,
    totalPrice: totalPrice,
    user: req.body.user,
  });
  const orderCreated = await order.save();
  if (!orderCreated) {
    return res.status(500).json({ success: false });
  }
  return res.send(orderCreated);
});

router.put('/:id', async (req, res) => {
  const id = req.params.id;
  const order = await Order.findOneAndUpdate(
    { _id: id },
    {
      status: req.body.status,
    },
    { new: true }
  );

  if (!order) {
    return res.status(400).send(`The Order can'not be Updated`);
  } else {
    res.send(order);
  }
});

/*router.delete('/:id', (req, res) => {
  Order.findByIdAndDelete(req.params.id)
    .then((order) => {
      if (order) {
        return res
          .status(200)
          .json({ success: true, message: 'The Order Deleted' });
      } else {
        return res
          .status(404)
          .json({ success: false, message: 'The Order Not Found' });
      }
    })
    .catch((error) => {
      return res.status(500).json({ success: false, message: error });
    });
});*/

router.delete('/:id', async (req, res) => {
  const order = await Order.findByIdAndDelete(req.params.id);

  if (order) {
    await order.orderItems.map(async (orderItem) => {
      await OrderItem.findByIdAndDelete(orderItem);
    });
    return res
      .status(200)
      .json({ success: true, message: 'The Order Deleted' });
  } else {
    return res
      .status(404)
      .json({ success: false, message: 'The Order Not Found' });
  }
});

router.get('/get/totalsales', async (req, res) => {
  const totalSales = await Order.aggregate([
    { $group: { _id: null, totalsales: { $sum: '$totalPrice' } } },
  ]);
  if (!totalSales) {
    return res.status(400).send('The Order Sales cannot be generated.');
  }
  res.send({ totalSales: totalSales.pop().totalsales });
});

router.get('/get/count', async (req, res) => {
  const orderCount = await Order.createDocuments((count) => count);
  if (!orderCount) {
    return res.status(500).json({ success: false });
  }
  res.send({
    orderCount: orderCount,
  });
});

router.get('/get/userorders/:userid', async (req, res) => {
  const userOrderList = await Order.find({ user: req.params.userid })
    .populate({
      path: 'orderItems',
      populate: {
        path: 'product',
        populate: 'category',
      },
    })
    .sort({ dateOrdered: -1 });
  if (!userOrderList) {
    return res.status(500).json({ success: false });
  } 
  res.send(userOrderList);
});

module.exports = router;
