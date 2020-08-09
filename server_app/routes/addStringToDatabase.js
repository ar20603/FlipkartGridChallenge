var express = require('express')
var router = express.Router();

var doit = (req, res, next) => {
    res.send("API is working successfully");
    
};

router.get("/", doit);

module.exports = router;
