const router = require('express').Router();
const recController = require('../controller/rec.js')
const usercontroller = require('../controller/usercontroller.js')
 
router.post('/addRec', recController.addRec);
router.get('/getRecs',usercontroller.verifytokenadmin, recController.getRecs);////
router.get('/getRec', recController.getRec);
router.delete('/deleteRec/:_id',recController.deleteRec);


module.exports = router; 