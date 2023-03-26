1. require Node.js 导入 
2. import ES6 导入 不能混合ß
## 导入导出例子
3. import { WCH } from '../wecom/help.js';
4. export { WCH };
5. import  wcconfig  from '../wecom/config.js'; wcconfig　可与里面导出不一致 实现换名
## NPM 升级
1. n 支持切换版本 不适合时 可以降版本
## Pm2 升级
1. 支持ES6 语法
2. 要用sudo 
3. # Install latest PM2 version  
$ npm install pm2@latest -g  
# Save process list, exit old PM2 & restore all processes  
$ pm2 update  
## Express
两个依次奏效
app.use(express.static(path.join(__dirname, 'web/dist/')));//设置后才能取得
app.get('/',function(req, res){//get,put,post,delete   
  res.sendFile(path.join(__dirname, "./", "web", "dist2","index.html"));
  // res.sendFile(path.join(__dirname,'/web/dist/index.html'));
});
## Apex
http://kayakuguri.github.io/blog/2014/02/26/submit-callout-with-multipart/
## Vue
1. setup的函数是开放给外界看，xxx.value可访问
2. @绑定方法
3. :data-id="user.Id" var id = e.currentTarget.dataset.id;
4. 数据迁移 this.$router.push({ name: 'userInfo', query: { user: id } })

## Salesforce文件体系
1. 以contentXX开头的 几个Object
2. ContentDocument 是核心
3. ContentVersion 存放文件实体 VersionData 注意是以Base64存放的      
## Base64 
以64个字符(其实是65 有=号)
## 网络获取数据
1. 首先以Base64 取得数据（fetch-base64）
2. 转换成Binary发送，直接前面可以显示
3. 也可以Base64 但前面需要支持