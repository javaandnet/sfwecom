
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
                    resolve(err);
                } else {
                    resolve(res);
                }
            });
        });
    }
    async update(objectName, rec) {
        var me = this;
        if (me.conn == null) {
            await me.login();
        }
        return new Promise(function (resolve, reject) {
            me.conn.sobject(objectName).update(rec, function (err, res) {
                if (err) {
                    console.error(err);
                    resolve(err);
                } else {
                    resolve(res);
                }
            });
        });
    }
    insert() {

    }
    delete() {

    }

    async upsert(objectName, obj) {
        var me = this;
        if (me.conn == null) {
            await me.login();
        }
        return new Promise(function (resolve, reject) {
            // Single record upsert
            console.log(obj);

            if (typeof (obj.Id) == "undefined" || obj.Id == "" || obj.Id == "-1") {
                delete obj["Id"];
                me.conn.sobject(objectName).insert(obj, function (err, res) {
                    if (err) {
                        console.error(err);
                        resolve(err);
                    } else {
                        resolve(res);
                    }
                });
            } else {
                me.conn.sobject(objectName).update(obj,  function (err, res) {
                    if (err) {
                        console.error(err);
                        resolve(err);
                    } else {
                        resolve(res);
                    }
                });
            }
        });
    }

    async retrieve(objectName, id) {
        var me = this;
        if (me.conn == null) {
            await me.login();
        }
        return new Promise(function (resolve, reject) {
            // Single record retrieval
            me.conn.sobject(objectName).retrieve(id, function (err, res) {
                if (err) {
                    //console.log(err);
                    resolve({ errorCode: err.errorCode });
                } else {
                    console.log("Name : " + res.Name);
                    resolve(res);
                }
            });
        });
        //[
        //   "0017000000hOMChAAO",
        //   "0017000000iKOZTAA4"
        // ]
    }
}

export { JSH };
//http://160.16.216.251:11117/msg?type=1&to=SALESFORCE&msg=SALESFORCETEST
//http://160.16.216.251:11117/sf
//http://localhost:3000/sf/worker/a050l00000GQUk9AAH