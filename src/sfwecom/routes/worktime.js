import express from "express";
import { JSH } from '../util/jsh.js';
import { Util } from '../util/util.js';
import multer from "multer";

var router = express.Router();
var util = new Util();

router.post('/', function (req, res, next) {

    var jsh = new JSH();
    var userid = req.body.userid;
    var month = req.body.month;
    var sql = "SELECT Id, Employee__c, Month__c,  Time__c FROM WorkTime__c where Month__c ='" + month + "' and Employee__c = '" + userid + "'";
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
    
    const file = req.file;
    var jsh = new JSH();
    var lastIndex = file.originalname.lastIndexOf(".");
    var fileName = file.originalname;
    fileName = month+"_"+userName + fileName.substring(lastIndex,fileName.length);
    var sql = "SELECT Id, Name, ParentContentFolderId FROM ContentFolder where ParentContentFolderId= '07H0l0000004SRwEAM' and Name='"+month+"'";
    jsh.query(sql).then(function(rtn){
        if (rtn.totalSize > 0) {
            var folderId =rtn.records[0].Id;
            var libraryId = "0585h000001NUq2AAG";
            jsh.upload(file.buffer, fileName,folderId,libraryId).then(function (rut) {               
                res.send(rut);
            });
          }else{
            res.send(404);
          }
    });
});
async function uploadFile(req, res){
    const month = req.body.month;
    const user = req.body.user;
    const userName = req.body.userName;
    const folder = req.body.folder;
}
export default router;
