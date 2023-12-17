const { StatusCodes } = require('http-status-codes');
const ProductService = require('../services/product.service');

class ProductController {
    async GET(req, res, next) {
        try {
            const JSON = await ProductService.getProducts(req);
            return res.status(JSON.status).json(JSON);
        } catch (error) {
            next(error);
        }
    }

    async GET_BY_ID(req, res, next) {
        try {
            const JSON = await ProductService.getProductById(req);
            return res.status(JSON.status).json(JSON);
        } catch (error) {
            next(error);
        }
    }

    async POST(req, res, next) {
        try {
            const JSON = await ProductService.createProduct(req);
            return res.status(JSON.status).json(JSON);
        } catch (error) {
            next(error);
        }
    }

    async DELETE(req, res, next) {
        try {
            const JSON = await ProductService.deleteProduct(req);
            return res.status(JSON.status).json(JSON);
        } catch (error) {
            next(error);
        }
    }

    async PUT(req, res, next) {
        try {
            const JSON = await ProductService.updateProduct(req);
            return res.status(JSON.status).json(JSON);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new ProductController();
