const path = require('path');

const express = require('express');

const { getAddProducts, getProducts, postAddProducts, getEditProducts, postEditProducts, deleteProduct } = require('../controllers/admin');
const router = express.Router();

router.post('/delete-product', deleteProduct);

router.get('/add-product', getAddProducts);

router.get('/products', getProducts);

router.post('/add-product', postAddProducts);

router.get('/edit-product/:productId', getEditProducts);

router.post('/edit-product', postEditProducts);




module.exports = router;