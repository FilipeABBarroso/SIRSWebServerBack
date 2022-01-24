const express = require("express");
const router = express.Router();
const authenticationController = require('../controllers/authenticationController');

router.post('/authentication', 
    authenticationController.authentication,
);
module.exports = router;