/**
 * Created by Alicia on 2015-03-08.
 */
/**
 * Created by Alicia on 2015-03-08.
 */

var express = require('express'),
    router = express.Router();

var mainController = require('../controller/mainCont');


/* Middleware */
router.use( function(req, res, next) {
    next();
});

//------------------------
// ROUTING start with '/'
//------------------------

router.get('/', mainController.standalone);



//--------------
// MODULE EXPORT
module.exports = router;
