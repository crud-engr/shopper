const mongoose = require('mongoose');

let productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
        },
        description: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
        },
        price: {
            type: Number,
            required: true,
        },
        category: {
            type: String,
            default: 'default',
        },
        quantity_in_stock: {
            type: Number,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        expiry_date: {
            type: String,
            required: true,
        },
        in_stock: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true }
);

module.exports = new mongoose.model('Product', productSchema);
