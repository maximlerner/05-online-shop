const express = require('express');

const router = express.Router();

const deliveryController = require('../Controllers/deliveryController');
const authController = require('../Controllers/authController');


router.get('/getAllDeliveries',deliveryController.getAllDeliveries);
router.post('/createNewDelivery',deliveryController.createDelivery);
router.patch('/updateDelivery/:id',deliveryController.updateDelivery);

router.get('/findDeliveryByCartID/:id',deliveryController.findDeliveryByCartID);

module.exports = router;