import express from "express";
import { JSH } from '../jsforce/help.js';

var router = express.Router();


/* GET users listing. */
router.get('/worker', function (req, res, next) {
  var jsh = new JSH();
  var sql = "SELECT Id, Name FROM worker__C where SalesStatus__c='可能'";
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
/* GET users listing. */
router.get('/worker/:user', function (req, res, next) {
  var user = req.params.user;
  var jsh = new JSH();
  jsh.retrieve("worker__c",user).then(data => {
    var rtn = "";
    // console.log(data);
 
      //data.records.forEach(elm => { rtn = rtn + elm.Name + "<br>" });
      res.send({id:data.Id,name:data.Name,status:data.Status__c,salesStatus:data.SalesStatus__c});
    
  });
});
router.post('/worker/:user/update', function (req, res, next) {
  var user = req.params.user;
  console.log(req.body);
  var jsh = new JSH();
  jsh.update("worker__c",{Id:user,SalesStatus__c:req.body.salesStatus,ChangeReason__c:req.body.reason,StatusLastUpdater__c:req.body.userId}).then(data => {
      res.send(data);
  });
  // jsh.retrieve("worker__c",user).then(data => {
  //   var rtn = "";
  //   // console.log(data);
 
  //     //data.records.forEach(elm => { rtn = rtn + elm.Name + "<br>" });
  //     res.send({id:data.Id,name:data.Name,status:data.Status__c});
    
  // });
});

export default router;
