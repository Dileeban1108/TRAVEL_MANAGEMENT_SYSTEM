const express=require('express')
const router=express.Router()
const registerController=require('../controllers/registerController')
 
router.post('/schoolRegister',registerController.handleNewSchoolBus)
router.post('/rootRegister',registerController.handleNewRootBus)


module.exports=router