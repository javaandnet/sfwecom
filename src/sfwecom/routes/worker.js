import express from "express";
import { JSH } from '../util/jsh.js';
import { Util } from '../util/util.js';
var router = express.Router();
var util = new Util();



/* GET users listing. */
router.get('/', function (req, res, next) {
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
router.post('/', function (req, res, next) {
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
router.get('/:user', function (req, res, next) {
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
router.post('/:user', function (req, res, next) {
  var user = req.params.user;
  var jsh = new JSH();
  jsh.retrieve("worker__c", user).then(data => {
    var rtn = "";
    // console.log(data);

    //data.records.forEach(elm => { rtn = rtn + elm.Name + "<br>" });
    res.send({ data: { id: data.Id, name: data.Name, status: data.Status__c, salesStatus: data.SalesStatus__c } });

  });
});
router.post('/:user/update', function (req, res, next) {
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
});


// router.get('/worker/:user/update', function (req, res, next) {

// });
export default router;
