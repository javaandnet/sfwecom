import crypto from 'crypto';

class WeChat {
    setCompany(company) {
        this.company = company;
    }
    async decryptUserInfoData(sessionKey, encryptedData, iv) {
        // base64 decode
        const _sessionKey = new Buffer(sessionKey, 'base64');
        encryptedData = new Buffer(encryptedData, 'base64');
        iv = new Buffer(iv, 'base64');
        let decoded = '';
        try {
            // 解密
            const decipher = crypto.createDecipheriv('aes-128-cbc', _sessionKey, iv);
            // 设置自动 padding 为 true，删除填充补位
            decipher.setAutoPadding(true);
            decoded = decipher.update(encryptedData, 'binary', 'utf8');
            decoded += decipher.final('utf8');

            decoded = JSON.parse(decoded);
        } catch (err) {
            console.dir(err);
            return '';
        }
        console.log("%s:%s", decoded.watermark.appid, this.company.appid)
        if (decoded.watermark.appid !== this.company.appid) {
            return '';
        }

        return decoded;
    }

    async decryptData(sessionKey, encryptedData, iv) {

        // base64 decode
        const _sessionKey = new Buffer(sessionKey, 'base64');
        encryptedData = new Buffer(encryptedData, 'base64');
        iv = new Buffer(iv, 'base64');
        let decoded = '';
        try {
            // 解密
            const decipher = crypto.createDecipheriv('aes-128-cbc', _sessionKey, iv);
            // 设置自动 padding 为 true，删除填充补位
            decipher.setAutoPadding(true);
            decoded = decipher.update(encryptedData, 'binary', 'utf8');
            decoded += decipher.final('utf8');
            return decoded;
        } catch (err) {
            console.dir(err);
            return '';
        }

    }
}

export { WeChat };