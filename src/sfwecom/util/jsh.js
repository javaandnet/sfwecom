
import jsforce from 'jsforce';
// var conn = new jsforce.Connection();
import config from '../jsforce/config.js';
import fetch64 from 'fetch-base64';
//PWD+ResetToken
import mimetypes from "mime-types";
class JSH {
    constructor(x) {
        this.conn = null;
    }

    login() {
        var me = this;
        return new Promise(function (resolve, reject) {
            if (me.conn != null) {
                resolve(me.conn);
            } else {
                let conn = new jsforce.Connection({ loginUrl: config.loginUrl });
                conn.login(config.userId, config.pwd, function (err, res) {
                    if (err) {
                        console.error(err);
                        reject(err);
                    } else {
                        me.conn = conn;
                        resolve(conn);
                    }
                });
            }
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

    async upload(file, fileName, folderId, libraryId) {
        var me = this;
        if (me.conn == null) {
            await me.login();
        }
        try {
            //1. Insert ContentVersion.
            var file = await me.conn.sobject('ContentVersion').create({
                PathOnClient: fileName,
                FirstPublishLocationId: libraryId,
                VersionData: file.toString('base64')
            });
            //0680l000003V5qVAAS
            //1.1 Get DocumentId
            var document = await me.conn.sobject('ContentDocument').find({ LatestPublishedVersionId: file.id }, "Id");
            // 2.Insert ContentDocumentlink and use required Library Id in LinkedEntityId field.
            // await me.conn.sobject('ContentDocumentLink').create({
            //     ContentDocumentId: document[0].Id,
            //     LinkedEntityId: libraryId
            // });
            // sELECT Id, Title FROM ContentVersion
            // 07I0l0000003CCMEA2
            //  3.Query on ContentFolderMember Where ChildRecordId is your ContentVersion file Id and ParentContentFolderId is the RootContentFolderId of library(ContentWorkspace).
            if (document.length == 0) {
                throw new Error('ERROR MOVE FOLDER');
            }
            var folder = await me.conn.sobject('ContentFolderMember').find({ ChildRecordId: document[0].Id }, "Id");
            if (folder.length == 0) {
                throw new Error('ERROR MOVE FOLDER');
            }
            //4. Now update the ContentFolderMember record's ParentContentFolderId field with your required Folder Id.
            await me.conn.sobject('ContentFolderMember').update({ Id: folder[0].Id, ParentContentFolderId: folderId });
            //https://d5h00000523kreay--fsrdev001.sandbox.lightning.force.com/
            //  //https://d5h00000523kreay--fsrdev001.sandbox.my.salesforce.com/sfc/servlet.shepherd/version/download/0680l000003V5r4AAC
        } catch (e) {
            console.log(e);
            throw e;
        }
    }
    //SELECT Id, ParentContentFolderId, Title FROM ContentFolderItem WHERE ParentContentFolderId = '07H0l0000004SS1EAM'
    /**
     * 
     * @param {*} Name 
     * @param {*} DeveloperName 
     * @param {*} Type 
     * @param {*} AccessType 
     * @param {*} ParentId
     * @returns 
     */
    async createFolder(folder) {
        var me = this;
        if (me.conn == null) {
            await me.login();
        }
        return new Promise(function (resolve, reject) {
            me.conn.sobject('ContentFolder').create(folder).then(function (ret) {
                if (ret || !ret.success) {
                    console.error(ret);
                    reject(ret);
                } else {
                    resolve(ret);
                }
            }).catch(function (err) {
                reject(err);
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
                me.conn.sobject(objectName).update(obj, function (err, res) {
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
    }
    async file(req, res, id) {
        var me = this;
        //id="0680l000003V5khAAC";
        await me.login();
        try {
            var files = await me.conn.sobject('ContentVersion').find({
                Id: id
            }, "Id,Title,FileExtension");

            if (files.length == 0) {
                throw new Error("NO DATA:" + id);
            } else {
                var title = files[0].Title;
                var ext = files[0].FileExtension;
                // var versionData = files[0].VersionData;
                const fileName = title;
                var fileMime = mimetypes.lookup("a." + ext);
                //fileMime = "image/svg+xml";
                // const fileMime = "jpg";
                res.set('Content-Type', fileMime);
                res.set('Content-Transfer-Encoding', 'binary');
                var url = config.loginUrl + 'services/data/v55.0/sobjects/ContentVersion/' + id + '/VersionData';
                const accessToken = me.conn.accessToken;
                const doFetchRemote = await fetch64.remote({
                    url: url,
                    headers: {
                        'Authorization': 'Bearer ' + accessToken
                    }
                });
                let decode = Buffer.from(doFetchRemote[0], 'base64');
                res.send(decode);
                me.conn.request(
                    url
                )
                    .then((result) => {
                        res.send(result);
                    });
            }
        } catch (e) {
            res.send("NO DATA");
        }
    }
}
//http://localhost:11117/sf/file/0680l000003V5r4AAC
export { JSH };
//http://160.16.216.251:11117/msg?type=1&to=SALESFORCE&msg=SALESFORCETEST
//http://160.16.216.251:11117/sf
//http://localhost:3000/sf/worker/a050l00000GQUk9AAH