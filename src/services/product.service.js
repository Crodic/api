const createHttpError = require('http-errors');
const ProductModel = require('../models/product.model');
const fs = require('fs');
const { StatusCodes } = require('http-status-codes');

class ProductService {
    async getProducts(req) {
        try {
            let { page, limit } = req.query;
            if (!page || page < 0) page = 1;
            if (!limit || limit <= 0) limit = 10;
            const skip = Math.ceil((page - 1) * Math.floor(limit));
            const total = await ProductModel.countDocuments();
            const products = await ProductModel.find().skip(skip).limit(limit);
            return {
                status: StatusCodes.OK,
                msg: 'GET ALL PRODUCTS SUCCESSFULLY',
                total,
                page: Math.floor(page),
                totalPage: Math.ceil(total / limit),
                products,
            };
        } catch (error) {
            throw error;
        }
    }

    async getProductById(req) {
        try {
            const { pid } = req.params;
            const product = await ProductModel.findById(pid);
            if (!product) throw createHttpError(404, `Product with ID: ${pid} is not found`);
            return {
                status: StatusCodes.OK,
                msg: `GET PRODUCT WITH ID: ${pid} SUCCESSFULLY`,
                product,
            };
        } catch (error) {
            throw error;
        }
    }

    async createProduct(req) {
        try {
            const { filename } = req.file;
            const url = `${req.protocol}://${req.get('host')}/uploads/${filename}`;
            const data = {
                image: url,
                ...req.body,
            };
            const newProduct = new ProductModel(data);
            const create = await newProduct.save();

            if (!create) throw createHttpError(400, 'Create product fail, Please try again');
            return {
                status: StatusCodes.CREATED,
                msg: 'CREATE PRODUCT SUCCESSFULLY',
                product: create.toJSON(),
            };
        } catch (error) {
            throw error;
        }
    }

    async deleteProduct(req) {
        try {
            const { pid } = req.params;
            const findImage = await ProductModel.findById(pid).select('image');
            if (!findImage) throw createHttpError(404, 'Can not find product');
            fs.unlinkSync(`src/uploads/${findImage.image.split('/')[4]}`);
            const deleteProduct = await ProductModel.findByIdAndDelete(pid);
            if (!deleteProduct) throw createHttpError(404, 'Product is not delete because is not exists');
            return {
                status: StatusCodes.OK,
                msg: `DELETE PRODUCT BY ID ${pid} SUCCESSFULLY`,
            };
        } catch (error) {
            throw error;
        }
    }

    async updateProduct(req) {
        try {
            const { pid } = req.params;
            const product = await ProductModel.findByIdAndUpdate(pid, { ...req.body }, { new: true });
            if (!product) throw createHttpError(404, 'Can not update product because is not found');
            return {
                status: StatusCodes.CREATED,
                msg: `UPDATE PRODUCT BY ID: ${pid} SUCCESSFULLY`,
                product,
            };
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new ProductService();
