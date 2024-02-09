const express = require("express");
const empController = require('../controllers/empController');
const empRoutes = express.Router();

// userRouter.get("/getuser/:id", auth, userController.getuser);
empRoutes.get('/getAllEmployee',empController.getAllEmployee);
empRoutes.post('/addNewEmployee', empController.addNewEmployee);
empRoutes.post('/updateEmployee',empController.updateEmployee);
empRoutes.delete('/delete/:id',empController.deleteEmployee);
empRoutes.get('/getSearchedEmp',empController.getSearchedEmp);
empRoutes.post('/filteremployee',empController.filteremployee);
empRoutes.get('/calcutateAvgSal',empController.calcutateAvgSal);
module.exports = empRoutes;