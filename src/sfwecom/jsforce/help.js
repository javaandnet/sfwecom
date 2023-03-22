
import jsforce from 'jsforce';
// var conn = new jsforce.Connection();
import config from './config.js';
//PWD+ResetToken

class JSH {
    constructor(x) {
        this.conn = null;
    }

    login() {
        var me = this;
        let conn = new jsforce.Connection({ loginUrl: config.loginUrl });
        return new Promise(function (resolve, reject) {
            conn.login(config.userId, config.pwd, function (err, res) {
                if (err) {
                    console.error(err);
                    reject(err);
                } else {
                    me.conn = conn;
                    resolve(conn);
                }
                // conn.query('SELECT Id, Name FROM worker__C', function (err, res) {
                //     if (err) { return console.error(err); }
                //     resolve(res);
                // });
            });
        });
    }
    async query(sql) {
        var me = this;
        if (me.conn == null) {
            await me.login();
        }
       
        return new Promise(function (resolve, reject) {
            me.conn.query(sql, function (err, res) {
                if (err) {
                    console.error(err);
                    reject(err);
                }
                resolve(res);
            });
        });
    }
    update() {

    }
    insert() {

    }
    delete() {

    }
}

export { JSH };
//http://160.16.216.251:11117/msg?type=1&to=SALESFORCE&msg=SALESFORCETEST
//http://160.16.216.251:11117/sf