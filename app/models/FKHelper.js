/* FKHelper Model */

'use strict';

module.exports = (model, id) => {
    return new Promise((resolve, reject) => {
        model.findOne({_id: id}, (err, result) => {
            if (result) return resolve(true);
            else return reject(new Error(`FK Consraint 'checkObjectExists' fro '${id.toString()}' failed`));
        });
    });
};