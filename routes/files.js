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

router.get('/getFiles', verifyToken,
    filesController.getFiles,
);

router.post('/createFile', verifyToken,
    filesController.createFile,
);

module.exports = router;