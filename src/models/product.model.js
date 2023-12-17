const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Name product is required'],
        },
        description: {
            type: String,
        },
        price: {
            type: Number,
            min: [0, 'Product have price > 0'],
            default: 0,
        },
        discount: {
            type: Number,
            default: 0,
            max: [100, 'Discount max value is 100%'],
        },
        rating: {
            type: Number,
            default: 0,
            max: [5, 'Rate product is max value 5'],
            min: [0, 'Rate product is min value 0'],
        },
        image: {
            type: String,
            required: [true, 'Image product is required'],
        },
    },
    {
        timestamps: true,
    }
);

const ProductModel = mongoose.model('product', ProductSchema);
module.exports = ProductModel;
