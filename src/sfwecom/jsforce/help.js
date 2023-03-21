// var jsforce = require('jsforce');
import jsforce from 'jsforce';
// var conn = new jsforce.Connection();

//PWD+ResetToken

class JSH {
    constructor(x) {

    }
    test() {
        console.log(111111);
    }

    login() {
        let conn = new jsforce.Connection({ loginUrl: 'https://d5h00000523kreay--fsrdev001.sandbox.my.salesforce.com/' });
        return new Promise(function (resolve, reject) {
            conn.login('hr-h8pk@force.com.fsrdev001', 'fsrSBdev001!NNdYTK3MVsqiNvy8rAJMdVcW', function (err, res) {
                if (err) { return console.error(err); }
                conn.query('SELECT Id, Name FROM worker__C', function (err, res) {
                    if (err) { return console.error(err); }
                    resolve(res);
                });
            });
        });
    }


}

export { JSH };