const express = require('express');

const router = express.Router();

const productController = require('../Controllers/productController');
const authController = require('../Controllers/authController');


router.get('/getAllProducts',productController.getAllProducts);
router.post('/createNewProduct',productController.createProduct);
router.get('/getProduct/:id',productController.getProduct);
router.patch('/updateProduct/:id',productController.updateProduct);
router.delete('/deleteProduct/:id',productController.deleteProduct);

module.exports = router;