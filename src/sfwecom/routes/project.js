import express from "express";
import { JSH } from '../util/jsh.js';
import { Util } from '../util/util.js';
var router = express.Router();
var util = new Util();



/* GET users listing. */
router.post('/', function (req, res, next) {
  var jsh = new JSH();
  var sql = "SELECT Id, Name,Priority__c, Status__c FROM Project__c where Status__c<>'完了' order by Priority__c ASC NULLS LAST";
  jsh.query(sql).then(data => {
    var rtn = "";
    if (data.totalSize > 0) {
      //data.records.forEach(elm => { rtn = rtn + elm.Name + "<br>" });
      data.data = data.records.map(function (elm) { return { id: elm.Id, name: elm.Name, Status__c: elm.status, css: elm.Priority__c }; });
      delete data.records;
      res.send(data);
    } else {
      res.send("false");
    }
  });
});

/* Add project */
router.post('/upsert', function (req, res, next) {
  var jsh = new JSH();
  var body = req.body;
  //,reason:data.ClosedReason__c
  var obj = { Id: body.id, Detail__c: body.detail, Name: body.name, Status__c: body.status, ClosedReason__c: body.reason, ChangeStatusUser__c: body.updateuser, Priority__c: body.priority };
  //  res.send({ data:{id: data.Id, name: data.Name,status: data.Status__c,priority:data.Priority__c,detail: data.Detail__c }});
  jsh.upsert("Project__c", obj).then(data => {
    var rtn = "";
    res.send(data);
  });
});
/* GET users listing. */
router.post('/:id', function (req, res, next) {
  var id = req.params.id;
  var jsh = new JSH();
  jsh.retrieve("Project__c", id).then(data => {
    var rtn = "";
    console.log(data);

    //data.records.forEach(elm => { rtn = rtn + elm.Name + "<br>" });
    res.send({ data: { id: data.Id, name: data.Name, status: data.Status__c, priority: data.Priority__c, detail: data.Detail__c, reason: data.ClosedReason__c } });

  });
});


export default router;
