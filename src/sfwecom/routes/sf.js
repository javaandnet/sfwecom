import express from "express";
import { JSH } from '../util/jsh.js';
import { Util } from '../util/util.js';
var router = express.Router();
var util = new Util();


/* GET users listing. */
router.post('/folder/add', function (req, res, next) {
  var folder = util.copy(req.body)
  var jsh = new JSH();
  jsh.createFolder(folder).then(function (ret) {
    res.send(ret);
  }).catch(function (e) {
    res.send(e);
  });
});


router.get('/file/:id', function (req, res, next) {
    var jsh = new JSH();
    var file =  jsh.file(req, res,req.params.id);
});

router.post('/menus', function (req, res, next) {
  var jsh = new JSH();
  var file =  jsh.query("SELECT Name, text__c, Url__c, Role__c, Image__c, Sort__c, Delete__c FROM MGMenu__c where Delete__c = false order by Sort__c").then(function(rtn){
    var menus = rtn.records.map(menu=>{
        return {
          no:menu.Name,
          text:menu.Text__c,
          url:menu.Url__c,
          role:menu.Role__c,
          image:menu.Image__c,
          sort:menu.Sort__c
        };
    });
    var rtn = {data:menus};
    res.send(rtn);

  });
});

export default router;
