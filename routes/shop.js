const path = require('path');

const express = require('express');

const {
    getProducts,
    getIndex,
    getCart,
    getCheckout,
    getOrders,
    getProductDtl,
    postCart,
    deleteCartItem,
    postOrders } = require('../controllers/shop');

const router = express.Router();

router.get('/', getIndex);
router.get('/products', getProducts);
router.get('/products/:productId', getProductDtl)
router.get('/cart', getCart);
router.post('/cart', postCart)
router.post('/deleteCartItem', deleteCartItem)
router.post('/create-order', postOrders)
router.get('/orders', getOrders)
// router.get('/checkout', getCheckout);
module.exports = router;
