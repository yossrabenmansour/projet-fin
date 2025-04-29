const router = require('express').Router();
const ProductsController = require('../controller/contoller.js')
const usercontroller = require('../controller/usercontroller.js')
 
router.post('/addProduct',ProductsController.addProduct);
router.get('/getProducts', ProductsController.getProducts);
router.get('/getALLProducts',usercontroller.verifytokenadmin, ProductsController.getProducts);
router.get('/getProduct/:id', ProductsController.getProduct);
router.patch('/updateProduct/:_id',ProductsController.updateProduct);
router.delete('/deleteProduct/:_id',ProductsController.deleteProduct);
router.get('/shop',ProductsController.getProducts)

module.exports = router; 