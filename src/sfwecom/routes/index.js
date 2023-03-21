import express from "express";

// var WCH = import('../wecom/help2.js');;


var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

export default router;