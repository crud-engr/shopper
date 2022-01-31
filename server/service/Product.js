const multer = require('multer');
const sharp = require('sharp');
const download = require('image-downloader');
const Product = require('../models/Product');
const Cart = require('../models/Cart');
const e = require('express');

exports.create = async (req, res) => {
    try {
        let {
            name,
            description,
            price,
            image,
            category,
            quantity_in_stock,
            expiry_date,
        } = req.body;

        if (!name)
            return res.status(400).json({
                status: 'fail',
                message: 'product name is required',
                code: 400,
            });
        if (!description)
            return res.status(400).json({
                status: 'fail',
                message: 'product description is required',
                code: 400,
            });
        if (!price)
            return res.status(400).json({
                status: 'fail',
                message: 'product price is required',
                code: 400,
            });
        if (!image)
            return res.status(400).json({
                status: 'fail',
                message: 'product image is required',
                code: 400,
            });
        if (!image.startsWith('https://'))
            return res.status(400).json({
                status: 'fail',
                message: 'invalid image url',
                code: 400,
            });

        if (!category)
            return res.status(400).json({
                status: 'fail',
                message: 'product category is required',
                code: 400,
            });
        if (!quantity_in_stock)
            return res.status(400).json({
                status: 'fail',
                message: 'product quantity_in_stock is required',
                code: 400,
            });
        if (!expiry_date)
            return res.status(400).json({
                status: 'fail',
                message: 'product expiry_date is required',
                code: 400,
            });

        let product = await Product.create({
            name,
            description,
            price,
            category,
            quantity_in_stock,
            image,
            expiry_date,
        });

        return res.status(201).json({
            status: 'success',
            message: 'Product created successfully',
            data: { product },
            code: 201,
        });
    } catch (err) {
        console.log(err.message);
        return res.status(500).json({
            status: 'error',
            message: err.message,
            code: 500,
        });
    }
};

exports.getAll = async (req, res) => {
    try {
        const product = await Product.find().exec();
        return res.status(200).json({
            status: 'success',
            records: product.length,
            data: { product },
            code: 200,
        });
    } catch (err) {
        return res.status(500).json({
            status: 'error',
            message: 'server error',
            code: 500,
        });
    }
};

exports.getOne = async (req, res) => {
    try {
        const id = req.params.id;
        const product = await Product.findOne({ _id: id });
        if (!product)
            return res.status(404).json({
                status: 'fail',
                message: 'Product not found',
                code: 404,
            });
        return res.status(200).json({
            status: 'success',
            data: { product },
            code: 200,
        });
    } catch (err) {
        return res.status(500).json({
            status: 'error',
            message: 'server error',
            code: 500,
        });
    }
};

exports.update = async (req, res) => {
    try {
        const id = req.params.id;
        const product = await Product.findOne({ _id: id });
        if (!product)
            return res.status(404).json({
                status: 'fail',
                message: 'Product not found',
                code: 404,
            });
        const updatedProduct = await Product.findOneAndUpdate(
            { _id: id },
            req.body,
            {
                new: true,
            }
        ).exec();

        return res.status(200).json({
            status: 'success',
            message: 'product successfully updated',
            data: { updatedProduct },
            code: 200,
        });
    } catch (err) {
        return res.status(500).json({
            status: 'error',
            message: 'server error',
            code: 500,
        });
    }
};

exports.delete = async (req, res) => {
    try {
        const id = req.params.id;
        const product = await Product.findOne({ _id: id });
        if (!product)
            return res.status(404).json({
                status: 'fail',
                message: 'Product not found',
                code: 404,
            });
        await Product.findOneAndDelete().exec();
        return res.status(204).json({
            status: 'success',
            data: null,
            code: 204,
        });
    } catch (err) {
        return res.status(500).json({
            status: 'error',
            message: 'server error',
            code: 500,
        });
    }
};

exports.addToCart = async (req, res) => {
    try {
        const id = req.params.id;
        const { quantity } = req.body;
        const product = await Product.findOne({ _id: id }).exec();
        if (!product)
            return res.status(404).status({
                status: 'fail',
                message: 'product not found',
                code: 404,
            });
        const productId = product._id;
        if (quantity < 1)
            return res.status(400).json({
                status: 'fail',
                message: 'quantity can not be less than one (1)',
                code: 400,
            });
        const cart = await Cart.create({
            product: productId,
            quantity,
        });
        return res.status(200).json({
            status: 'success',
            message: 'product added to cart',
            data: { cart },
            code: 200,
        });
    } catch (err) {
        // console.log(err.message);
        return res.status(500).status({
            status: 'fail',
            message: 'server error',
            code: 500,
        });
    }
};
