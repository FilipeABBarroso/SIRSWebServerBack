const express = require("express");
const router = express.Router();
const authenticationController = require('../controllers/authenticationController');
const verifyToken = require("../middleware/auth");

router.post('/authentication', 
    authenticationController.authentication,
);

router.post('/fileAuthentication', verifyToken,
authenticationController.fileAuthentication,
);
module.exports = router;