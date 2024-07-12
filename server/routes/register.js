const express=require('express')
const router=express.Router()
const registerController=require('../controllers/registerController')
 
router.post('/schoolRegister',registerController.handleNewSchoolBus)
router.post('/rootRegister',registerController.handleNewRootBus)
router.post('/addNewCard',registerController.addNewCard)


module.exports=router