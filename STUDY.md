1. require Node.js 导入 
2. import ES6 导入 不能混合
## 导入导出例子
3. import { WCH } from '../wecom/help.js';
4. export { WCH };
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