const express = require('express');
const cartController = require('../controllers/Cart');
const router = express.Router();

router.route('/').get(cartController.getAllCart);

router
    .route('/:id')
    .get(cartController.getCart)
    .patch(cartController.updateCart)
    .delete(cartController.deleteCart);

router.route('/:id/pay').post(cartController.payProduct);

module.exports = router;
