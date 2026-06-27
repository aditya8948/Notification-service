const express = require('express');

const router = express.Router();

const {infoController, emailController} = require('../../controllers');


router.get('/info' , infoController.info);
router.post('/tickets', emailController.create);
    

module.exports = router ;