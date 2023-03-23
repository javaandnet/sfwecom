import express from "express";
import { WCH } from '../wecom/help.js';
var router = express.Router();


/* GET users listing. */
router.get('/', function(req, res, next) {
  //getUserList
  var wch = new WCH();
  wch.getUserList();
  res.send('respond with a resource');
});
export default router;
