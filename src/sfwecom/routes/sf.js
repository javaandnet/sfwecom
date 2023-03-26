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

export default router;
