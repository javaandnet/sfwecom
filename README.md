# sfwecom
ブリッジト　として　Salesforce Wecom　結合
## Salesforce 　と　結合
[jsforce](https://jsforce.github.io/)

## Wecom　と　結合
[wecom]（https://github.com/witjs/wecom）
1. npm i wecom
2. cd ./sfwecom/sfwecom/src/sfwecom/wecom

## Express
1.  cd src
2.  sudo npm install express  -g
3.  sudo npm install express-generator -g
4. express sfwecom
5. cd sfwecom/src/sfwecom
6. npm install
7.  起動確認
   1. set DEBUG=sfwecom & npm start
   2. http://localhost:3000/
8.  Use Supervisor Watch Source modify
    1.  npm install -g supervisor
    2.  supervisor bin/www