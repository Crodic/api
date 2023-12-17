const express = require('express');
const productController = require('../controllers/product.controller');
// const multer = require('multer');
// const path = require('path');
// const { v4: uuid } = require('uuid');
// const storage = multer.diskStorage({
//     // Nơi Lưu File
//     destination: (req, file, res) => {
//         res(null, 'src/uploads');
//     },
//     // Trả về filename
//     filename: (req, file, res) => {
//         res(null, uuid() + path.extname(file.originalname));
//     },
// });

// const upload = multer({ storage });
const router = express.Router();

router.get('/', productController.GET);
// router.post('/', upload.single('image'), productController.POST);
router.post('/', productController.POST);
router.get('/:pid', productController.GET_BY_ID);
router.delete('/:pid', productController.DELETE);
router.put('/:pid', productController.PUT);

const ProductRouter = router;
module.exports = ProductRouter;
