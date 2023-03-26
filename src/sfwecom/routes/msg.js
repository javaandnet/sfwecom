import express from "express";
import { WCH } from '../util/wch.js';

var router = express.Router();

var sendMsg = async function (type, to, msg) {
  var rtn = "";
  var wch = new WCH();
  if (type == 0) {
    rtn = await wch.sendUserMsg(to, msg);
  } else {
    rtn = await wch.sendGroupMsg(to, msg);
  }
  return rtn;
}

/* GET users listing. */
router.get('/', function (req, res, next) {

  var wch = new WCH();

  var type = req.query.type || 1;
  var to = req.query.to || 1;
  var msg = req.query.msg || 1;
  sendMsg(type, to, msg).then(data => {
    console.log(data);
    if (data.errcode == 0) {
      res.send("success");
    } else {
      res.send(data.errmsg);
    }
  });

});



//http://localhost:11117/msg?type=0&to=nin&msg=testInfo
//http://localhost:11117/msg?type=1&to=SALESFORCE&msg=SALESFORCETEST
//http://localhost:3000/msg?type=1&to=SALESFORCE&msg=SALESFORCETEST
// http://160.16.216.251:11117/msg?type=1&to=SALESFORCE&msg=SALESFORCETEST
export default router;
