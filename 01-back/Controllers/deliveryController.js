const Delivery = require('./../Models/deliveryModel');
const catchAsync = require('./../Utils/catchAsync');
const AppError = require('./../Utils/appError');

exports.getAllDeliveries = catchAsync(async (req,res) => {
    const deliveries = await Delivery.find();

    res.status(200).json({
        status: 'success',
        results: deliveries.length,
        data: {
            deliveries
        }
    })
})

exports.createDelivery = catchAsync(async (req, res,next) => {
    const newDelivery = await Delivery.create(req.body);
  
    res.status(201).json({
      status: 'success',
      data: {
        delivery: newDelivery,
      },
    });
});

// That route is for connecting the delivery ditails in the cart page
exports.findDeliveryByCartID = catchAsync(async (req,res) => {
  const deliveries = await Delivery.find({cartID:{$eq: req.params.id}})
 
    res.status(200).json({
      status: 'success',
      results: deliveries.length,
      data: {
          deliveries
      }
  })
})

exports.updateDelivery = catchAsync(async (req, res,next) => {
    const delivery = await Delivery.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    })
  
    if(!delivery){
      return next(new AppError('No delivery found with that ID', 404))
    }
  
    res.status(200).json({
      status: 'success',
      data: {
        delivery
      },
    });
});