import express from "express";
import os from "os";
import multer from "multer";
import { JSH } from '../util/jsh.js';

var router = express.Router();
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })
// const upload = multer({ dest: os.tmpdir() });

router.post('/', upload.single('file'), function(req, res) {
  const month = req.body.month;
  const user = req.body.user;
  const file = req.file;
  var jsh = new JSH();
  jsh.upload(file.buffer,file.originalname).then(function(rtn){
    console.log(rtn);
    res.sendStatus(200);
  });


});
 
// router.get('/', function(req, res) {
//   res.sendFile(__dirname + "/dist/index.html");
// });
export default router;