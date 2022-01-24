const express = require("express");
const router = express.Router();
const registrationController = require('../controllers/registrationController');

router.post('/registration',
    registrationController.registration,
);

router.post('/isRegistered',
    registrationController.isRegistered,
);

module.exports = router;