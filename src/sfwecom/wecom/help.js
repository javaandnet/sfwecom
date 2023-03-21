import { Wecom } from "wecom";
import { User } from 'wecom';
// const Wecom = require("wecom");
// const User = require("wecom");

class WCH {
  constructor(x) {
    const wecom = new Wecom({
      corpId: "ww2460c9d1886951ff",
      corpSecret: "H0FnPR_xIE397RPx7uiyFsmF_nfvCKB2pJJCPjxT_nU",
    });
    this.wecom = wecom;
  }
  // 初始化企业微信对象


  async getToken() {
    var token = await this.wecom.getToken();
    return token;
  }

  test() {
    console.log(111111);
  }

  // Create Group
  async createGroup() {
    var me = this;
    var token = await me.getToken();
    me.wecom.request({
      url: "/appchat/create?access_token=" + token,
      method: "POST",
      // 发送消息的参数参照 [（官方文档）](https://work.weixin.qq.com/api/doc/90000/90135/90236) [（API 文档）]()
      data: {
        name: "SF テスト",
        "owner": "nin",
        msgtype: "text",
        "userlist": ["nin", "zhf", "zhangyiqi"],
        "chatid": "SALESFORCE"
      },
    }).then(function (e, cb) {
      console.log(e.data);
    });
  }
  //发送Group消息
  async sendGroupMsg(to, msg) {
    var me = this;
    var token = await me.getToken();
    return new Promise(function (resolve, reject) {
        me.wecom.request({
        url: "/appchat/send?access_token=" + token,
        method: "POST",
        // 发送消息的参数参照 [（官方文档）](https://work.weixin.qq.com/api/doc/90000/90135/90236) [（API 文档）]()
        data: {
          chatid: to,
          msgtype: "text",
          text: {
            content: msg,
          },
        },
      }).then(function (e, cb) {
        resolve(e.data);
      });
    });
  }

  sendUserMsg(to, msg) {
    var me = this; 
    return new Promise(function (resolve, reject) {
      // 发送消息
      me.wecom.request({
        url: "/message/send",
        method: "POST",
        // 发送消息的参数参照 [（官方文档）](https://work.weixin.qq.com/api/doc/90000/90135/90236) [（API 文档）]()
        data: {
          touser: to,
          msgtype: "text",
          agentid: 1000002,
          text: {
            content: msg,
          },
        },
      }).then(function (e, cb) {
        resolve(e.data);
      });
    });
  }
  async getUserList() {
    // 成员管理模块实例化
    const user = new User({
      corpId: "ww2460c9d1886951ff",
      corpSecret: "H0FnPR_xIE397RPx7uiyFsmF_nfvCKB2pJJCPjxT_nU",
    });
    var aa = await user.simpleList(1, 0);
    console.log(aa.data.userlist.length);
    for (var obj in aa.data.userlist) {
      console.log(aa.data.userlist[obj]);
    }
  }

}
export { WCH };


