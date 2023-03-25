import request from 'request';
class Http {
    async request(options) {
        var me = this;
        return new Promise(function (resolve, reject) {
            request(options, function (error, response, body) {
                resolve(body);
            });
        });
    }
}

export { Http };