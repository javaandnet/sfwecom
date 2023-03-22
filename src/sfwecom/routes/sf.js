import express from "express";
import { JSH } from '../jsforce/help.js';

var router = express.Router();


/* GET users listing. */
router.get('/', function (req, res, next) {

  var jsh = new JSH();
  var sql = 'SELECT Id, Name FROM worker__C';
  jsh.query(sql).then(data => {
    var rtn = "";
    if (data.totalSize > 0) {
      //data.records.forEach(elm => { rtn = rtn + elm.Name + "<br>" });
      res.send(data);
    } else {
      res.send("false");
    }
  });

});



export default router;
