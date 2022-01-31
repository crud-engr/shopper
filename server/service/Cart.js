const Cart = require('../models/Cart');

exports.getAllCart = async (req, res) => {
    try {
        const carts = await Cart.find().exec();
        return res.status(200).json({
            status: 'success',
            records: carts.length,
            data: { carts },
            code: 200,
        });
    } catch (err) {
        console.log(err.message)
        return res.status(500).status({
            status: 'fail',
            message: 'server error',
            code: 500,
        });
    }
};

exports.getCart = async (req, res) => {
    try {
        const id = req.params.id;
        const cart = await Cart.findOne({ _id: id });
        if (!cart)
            return res.status(404).json({
                status: 'fail',
                message: 'cart not found',
                code: 404,
            });
        return res.status(200).json({
            status: 'success',
            data: { cart },
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

exports.updateCart = async (req, res) => {
    try {
        const id = req.params.id;
        const cart = await Cart.findOne({ _id: id });
        if (!cart)
            return res.status(404).json({
                status: 'fail',
                message: 'cart not found',
                code: 404,
            });
        const updatedCart = await Cart.findOneAndUpdate(
            { _id: id },
            req.body,
            {
                new: true,
            }
        ).exec();

        return res.status(200).json({
            status: 'success',
            message: 'cart successfully updated',
            data: { updatedCart },
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

exports.deleteCart = async (req, res) => {
    try {
        const id = req.params.id;
        const cart = await Cart.findOne({ _id: id });
        if (!cart)
            return res.status(404).json({
                status: 'fail',
                message: 'cart not found',
                code: 404,
            });
        await Cart.findOneAndDelete().exec();
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