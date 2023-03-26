import express from "express";
import { JSH } from '../util/jsh.js';
import JSHConfig from '../jsforce/config.js';
import { Util } from '../util/util.js';
import multer from "multer";

var router = express.Router();
var util = new Util();

router.post('/', function (req, res, next) {

    var jsh = new JSH();
    var userid = req.body.userid;
    var month = req.body.month;
    var sql = "SELECT Id, Employee__c, Month__c,  Time__c,File__c,Url__c FROM WorkTime__c where Month__c ='" + month + "' and Employee__c = '" + userid + "'";
    jsh.query(sql).then(function (e) {
        res.send(e);
    });

});

router.post('/upsert', function (req, res, next) {
    var jsh = new JSH();
    var userid = req.body.userid;
    var month = req.body.month;
    var data = { Id: req.body.id, Month__c: month, Employee__c: userid, Time__c: req.body.time };
    jsh.upsert("WorkTime__c", data).then(function (e) {
        res.send(e);
    });
});

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

router.post('/upload', upload.single('file'), function (req, res) {
    const month = req.body.month;
    const user = req.body.user;
    const userName = req.body.userName;
    const folder = req.body.folder;
    const worktime = req.body.worktime;
    const fileId = req.body.fileId;
    const file = req.file;
    var jsh = new JSH();
    var lastIndex = file.originalname.lastIndexOf(".");
    var fileName = file.originalname;
    fileName = month + "_" + userName + fileName.substring(lastIndex, fileName.length);
    var sql = "SELECT Id, Name, ParentContentFolderId FROM ContentFolder where ParentContentFolderId= '"+ JSHConfig.rootFolder+"' and Name='" + month + "'";
    jsh.query(sql).then(function (rtn) {
        if (rtn.totalSize > 0) {
            var folderId = rtn.records[0].Id;
            var libraryId = JSHConfig.libraryId;
            jsh.upload(file.buffer, fileName, fileId,folderId, libraryId).then(function (rut) {
                jsh.upsert("WorkTime__c", { Id: worktime,File__c: rut, Url__c: JSHConfig.serverUrl+"sf/file/"+ rut }).then(function (worktime) {
                    res.send(rut);
                }).catch(function (e) {
                    res.send(e);
                });
            });
        } else {
            res.send(404);
        }
    });
});

export default router;
