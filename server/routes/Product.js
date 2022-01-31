const express = require('express');
const productController = require('../controllers/Product');
const router = express.Router();

router.route('/:id/add-to-cart').post(productController.addToCart);

router.route('/').post(productController.create).get(productController.getAll);

router
    .route('/:id')
    .get(productController.getOne)
    .patch(productController.update)
    .delete(productController.delete);

module.exports = router;
