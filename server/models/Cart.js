const mongoose = require('mongoose');

let cartSchema = new mongoose.Schema(
    {
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
        },
        quantity: {
            type: Number,
            default: 1,
        },
        totalPrice: {
            type: Number,
        }
    },
    { timestamps: true }
);

cartSchema.pre(/^find/, function (next) {
    this.populate({
        path: 'product',
        select: '-__v -createdAt -updatedAt',
    });
    next();
});

module.exports = new mongoose.model('Cart', cartSchema);
