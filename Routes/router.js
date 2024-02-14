// import express
const express = require('express')

const userController = require('../Controllers/userController')

const projectController = require('../Controllers/projectController')

const jwtMiddleware = require('../Middlewares/jwtMiddleware')

const multerConfig = require('../Middlewares/multerMiddleware')

// create router object of express to define path
const router = new express.Router()

// using router object to define path

// Register API path - http://localhost:4000/register - frontend
router.post('/register',userController.register)

// Login API path - http://localhost:4000/login - frontend
router.post('/login',userController.login)


// add user project API path - http://localhost:4000/project/add
router.post('/project/add',jwtMiddleware,multerConfig.single('projectImage'),projectController.addUserProject)

// get all users projects path - http://localhost:4000/project/all-user-projects
router.get('/project/all-user-projects',jwtMiddleware,projectController.getAllUserProjects)

// get all projects path - http://localhost:4000/project/all-project
router.get('/project/all-projects',jwtMiddleware,projectController.getAllProjects)

// get home project - http://localhost:4000/project/home-project
router.get('/project/home-projects',projectController.getHomeProject)

// update project - http://localhost:4000/project/update-project/677674
router.put('/project/update-project/:pid',jwtMiddleware,multerConfig.single('projectImage'),projectController.updateProject)

// // delete project - http://localhost:4000/project/delete-project/677674
router.delete('/project/delete-project/:pid',jwtMiddleware,projectController.deleteProject)


module.exports = router