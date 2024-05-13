// const mongodb = require('mongodb');
// const MongoClient = mongodb.MongoClient;
// let _db;
// const mongoConnect = callback => {
//     MongoClient.connect('mongodb+srv://mayur2002wagh:qjbtpZXw6911czns@mycluster.zrgz5rb.mongodb.net/?retryWrites=true&w=majority')
//         .then(client => {
//             _db = client.db()
//             console.log('connected')
//             callback();
//         }).catch(err => {
//             console.log(err);
//         });
// }

// const getdb = () => {
//     if (_db) {
//         return _db;
//     }
//     throw 'no database'
// }

// exports.mongoConnect = mongoConnect;
// exports.getdb = getdb;