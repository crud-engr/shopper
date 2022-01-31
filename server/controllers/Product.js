const productService = require('../service/Product');

exports.create = async (req, res) => {
    return productService.create(req, res);
};

exports.resizeProductImage = async (req, res, next) => {
    return productService.resizeProductImage(req, res, next);
};

exports.getAll = async (req, res) => {
    return productService.getAll(req, res);
};

exports.getOne = async (req, res) => {
    return productService.getOne(req, res);
};

exports.update = async (req, res) => {
    return productService.update(req, res);
};

exports.delete = async (req, res) => {
    return productService.delete(req, res);
};

exports.addToCart = async (req, res) => {
    return productService.addToCart(req, res);
};