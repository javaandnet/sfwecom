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
router.post('/employee/wechat', function (req, res, next) {
  var jsh = new JSH();
  var body = req.body;
  var sql = "SELECT Id, Name,Role__c FROM Employee__c WHERE WeChatID__c = '"+body.userId+"'";
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
router.post('/project', function (req, res, next) {
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
router.post('/project/upsert', function (req, res, next) {
  var jsh = new JSH();
  var body = req.body;
  //,reason:data.ClosedReason__c
  var obj = { Id: body.id, Detail__c: body.detail, Name: body.name, Status__c: body.status, ClosedReason__c: body.reason, ChangeStatusUser__c: body.updateuser,Priority__c:body.priority };
  //  res.send({ data:{id: data.Id, name: data.Name,status: data.Status__c,priority:data.Priority__c,detail: data.Detail__c }});
  jsh.upsert("Project__c", obj).then(data => {
    var rtn = "";
    res.send(data);
  });
});
/* GET users listing. */
router.post('/project/:id', function (req, res, next) {
  var id = req.params.id;
  var jsh = new JSH();
  jsh.retrieve("Project__c", id).then(data => {
    var rtn = "";
    console.log(data);

    //data.records.forEach(elm => { rtn = rtn + elm.Name + "<br>" });
    res.send({ data: { id: data.Id, name: data.Name, status: data.Status__c, priority: data.Priority__c, detail: data.Detail__c, reason: data.ClosedReason__c } });

  });
});
/* GET users listing. */
router.post('/worker', function (req, res, next) {
  var jsh = new JSH();
  var sql = "SELECT Id , Name ,SalesStatus__c,Status__c  FROM worker__C order by SalesStatus__c";
  jsh.query(sql).then(data => {
    var rtn = "";
    if (data.totalSize > 0) {
      //data.records.forEach(elm => { rtn = rtn + elm.Name + "<br>" });
      data.data = data.records.map(function (elm) { return { id: elm.Id, name: elm.Name, salesStatus: elm.SalesStatus__c }; });
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
  jsh.retrieve("worker__c", user).then(data => {
    var rtn = "";
    // console.log(data);

    //data.records.forEach(elm => { rtn = rtn + elm.Name + "<br>" });
    res.send({ id: data.Id, name: data.Name, status: data.Status__c, salesStatus: data.SalesStatus__c });

  });
});

/* GET users listing. */
router.post('/worker/:user', function (req, res, next) {
  var user = req.params.user;
  var jsh = new JSH();
  jsh.retrieve("worker__c", user).then(data => {
    var rtn = "";
    // console.log(data);

    //data.records.forEach(elm => { rtn = rtn + elm.Name + "<br>" });
    res.send({ data: { id: data.Id, name: data.Name, status: data.Status__c, salesStatus: data.SalesStatus__c } });

  });
});
router.post('/worker/:user/update', function (req, res, next) {
  var user = req.params.user;
  //console.log(req.body);
  var jsh = new JSH();
  var updateDateData = { Id: user, SalesStatus__c: req.body.salesStatus, ChangeReason__c: req.body.reason, StatusLastUpdater__c: req.body.updateuser };
  if (req.body.status && req.body.status != "") {
    updateDateData.status = req.body.status;
  }

  jsh.update("worker__c", updateDateData).then(data => {
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
