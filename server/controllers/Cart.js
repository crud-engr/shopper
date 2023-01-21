const cartService = require('../service/Cart');

exports.getAllCart = async (req, res) => {
    return cartService.getAllCart(req, res);
};

exports.getCart = async (req, res) => {
    return cartService.getCart(req, res);
};

exports.updateCart = async (req, res) => {
    return cartService.updateCart(req, res);
};

exports.deleteCart = async (req, res) => {
    return cartService.deleteCart(req, res);
};

exports.payProduct = async (req, res) => {
    return cartService.payProduct(req, res);
};

