const express = require("express");
const router = express.Router();
const filesController = require('../controllers/filesController');
const verifyToken = require("../middleware/auth");

router.post('/delegateFiles', verifyToken,
    filesController.delegate,
);

router.get('/delegatedFiles', verifyToken,
    filesController.getDelegated,
);
module.exports = router;