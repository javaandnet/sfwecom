import express from "express";
import { WCH } from '../wecom/help.js';
import  wcconfig  from '../wecom/config.js';

var router = express.Router();


/* GET users listing. */
router.get('/userid', function (req, res, next) {
  var STATE = "aaa";
  //console.log(wcconfig);
  var wch = new WCH();
  var REDIRECT_URI = "http://wc.fsr.co.jp:11117/wecom/";
  var url = "https://open.weixin.qq.com/connect/oauth2/authorize?appid="+wcconfig.corpId+"&redirect_uri=REDIRECT_URI&response_type=code&scope=snsapi_base&state="+STATE+"&agentid="+wcconfig.agentid+"#wechat_redirect  ";
  res.redirect(url);
});

router.get('/', function (req, res, next) {
  res.send(req.params);
});

router.post('/', function (req, res, next) {
  res.send(req.body);
});


export default router;
