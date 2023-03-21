import express from "express";
import { JSH } from '../jsforce/help.js';

var router = express.Router();


/* GET users listing. */
router.get('/', function (req, res, next) {

  var jsh = new JSH();


  jsh.login().then(data => {
    console.log(data);
    var rtn = "";
    if (data.totalSize > 0) {
      data.records.forEach(elm => { rtn = rtn + elm.Name + "<br>" });
      res.send(rtn);
    } else {
      res.send("false");
    }
  });

});



export default router;
