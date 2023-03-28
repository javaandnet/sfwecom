import express from "express";
import request from 'request';
import { WCH } from '../util/wch.js';
import { JSH } from '../util/jsh.js';
import { Http } from '../util/http.js';

import crypto from 'crypto';
import md5 from 'md5';

var router = express.Router();


/* GET users listing. */
router.get('/', function (req, res, next) {
  //getUserList
  var wch = new WCH();
  wch.getUserList();
  res.send('respond with a resource');
});


router.post('/auth', function (req, res) {
  var http = new Http();
  // console.log(111);
  auth(req, res);
});


router.post('/update', function (req, res) {
  var body = req.body;
  var dataQ = { Id: body.id, OpenId__c: body.openId, Status__c: 1, Name: body.name };
  var jsh = new JSH();
  jsh.upsert("WeChat__c", dataQ).then(function (req) {
    res.send(req);
    //var rtn = { errno:0,data: {userInfo:rtnData,token:""} };
  });

});


/**
   * 根据用户信息更新数据
   */
async function auth(req,res) {

  const clientIp = ''; // 暂时不记录 
  const code = req.body["code"];
  var _secret = "6d38f5a783bb0884edbdca2109efbec6";
  var _appid = "wx9103a740b6a512c8";
  var jsh = new JSH();
  // 获取openid,code:微信登录获取的code
  const options = {
    method: 'GET',
    url: 'https://api.weixin.qq.com/sns/jscode2session',
    qs: {
      grant_type: 'authorization_code',
      js_code: code,
      secret: _secret,
      appid: _appid
    }
  };
  var http = new Http();
  let sessionData = await http.request(options);
  sessionData = JSON.parse(sessionData);
  //不存在openid
  if (!sessionData.openid) {
    reject("NO Openid");
  } else {
    var openid = sessionData.openid;
    var body = req.body;
    var sql = "SELECT Id, Name,Role__c FROM Employee__c WHERE WeChatID__c = '" + openid + "'";
    var datas = await jsh.query(sql);
    if (datas.totalSize > 0) {
      var employee = datas.records[0];
      var rtn = { errno: 0, data: { userInfo: { id: employee.Id, name: employee.Name, role: employee.Role__c }, token: "" } };
      res.send(rtn);
    } else {
      var rtn = await regUser(openid);
      res.send(rtn);
    }
  }

}
async function regUser(openid) {
  var jsh = new JSH();
  return new Promise(function (resolve, reject) {
    var res = jsh.query("SELECT Id,Name,OpenId__c,Status__c FROM WeChat__c where OpenId__c ='" + openid + "'").then(function (data) {
      var rtnData = {};
      if (data.totalSize > 0) {
        var dataQ = data.records[0];
        rtnData = { id: dataQ.Id, name: dataQ.Name, openId: dataQ.OpenId__c, role: 0, status: dataQ.Status__c };
        var rtn = { errno: 0, data: { userInfo: rtnData, token: "" } };
        resolve(rtn);
      } else {//Insert
        //PlaceHolder修改
        var dataQ = { Id: "", OpenId__c: openid, Status__c: 0, Name: "" };
        jsh.upsert("WeChat__c", dataQ).then(function (req) {
          dataQ.role = 0;
          rtnData = { id: req.id, name: dataQ.Name, openId: dataQ.OpenId__c, role: 0, status: 0 };
          var rtn = { errno: 0, data: { userInfo: rtnData, token: "" } };
          resolve(rtn);
        });
      }
    });
  });
}

async function decryptAction() {
  // 解释用户数据
  const WeixinSerivce = this.service('weixin', 'admin');
  var token = this.post('token');
  var iv = this.post('iv');
  var data = this.post('data');
  //console.log(token+"#"+iv+"#"+data);
  const decrypData = await WeixinSerivce.decryptData(token, data, iv);
  return this.success({ data: decrypData });
}
export default router;
