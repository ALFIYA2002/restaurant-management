const express = require ('express');
const userContoller = require('../controllers/userController');
const chefController = require('../controllers/chefController');
const dishController = require('../controllers/dishController');
const menuController = require('../controllers/menuController.js');
const orderController = require ('../controllers/orderController.js')
const router = express.Router();
const token = require('../middlewere/userAuth');
const tableController = require('../controllers/tableController');




router.post('/registerManager',userContoller.registerManager)
router.post('/login',userContoller.userLogin)
router.post('/createUser', token.userAuthentication,userContoller.createUser);
router.post('/dishes',dishController.createDish);
router.get('/chefDetails',token.userAuthentication,chefController.getchefDetails)
router.get("/chefdetailswithdishes",token.userAuthentication,chefController.getChefDetailsandDishes)
router.put('/updatePrice',token.userAuthentication,dishController.updateDishPrice)
router.get('/dailydish',token.userAuthentication,dishController.getUpdatedDishPrice)
router.post('/createtodaysMenu',menuController.createTodaysMenu)
router.get('/getTodaysMenu',menuController.todaysMenu)
router.post('/createTable',tableController.createTable)
router.get('/getTable',token.userAuthentication,tableController.getTable)
router.put('/updateTable',token.userAuthentication,tableController.updateTable)
router.post('/createOrderList',orderController.createOrderList)
router.get('/getOrderlist',token.userAuthentication,orderController.getOrderList)
router.put('/updateOrderPrice',token.userAuthentication,orderController.addFoodOrderList)
router.put('/updateOrderStatus',token.userAuthentication,orderController.orderServed)

module.exports = router; 