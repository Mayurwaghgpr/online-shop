const mongoos = require('mongoose');
const Schema = mongoos.Schema;
const productSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    UserId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});
module.exports = mongoos.model('Product', productSchema)

// const getdb = require('../utils/database').getdb;
// const { ObjectId } = require('mongodb')

// class Product {
//     constructor(title, price, imageUrl, description, id, userId) {
//         this.title = title;
//         this.price = price;
//         this.imageUrl = imageUrl;
//         this.description = description;
//         this._id = id ? new ObjectId(this._id) : null;
//         this._userId = new ObjectId(userId);
//     }
//     save() {
//         const db = getdb();
//         let newdb;
//         if (this._id) {
//             console.log('updating', new ObjectId(this._id))
//             newdb = db.collection('products').updateOne({ _id: new ObjectId(this._id) }, { $set: this })
//         } else {
//             newdb = db.collection('products').insertOne(this)
//         }
//         return newdb
//             .then(result => {
//                 console.log("Ok", result);
//             }).catch(err => {
//                 console.log(err);
//             })
//     }

//     static fetchAll() {
//         const db = getdb();
//         return db.collection('products').find().toArray().then(product => {
//             // console.log(product)
//             return product
//         })
//     }
//     static removeProduct(Id) {
//         const db = getdb();
//         return db.collection('products').deleteOne({ _id: new ObjectId(Id) }).then(result => {
//             console.log(result)
//             return 'product deleted'
//         }).catch(err => {
//             console.log(err)
//         })
//     }
//     static fetchById(Id) {
//         console.log
//         const db = getdb();
//         return db.collection('products').findOne({ _id: new ObjectId(Id) }, (resutl) => { console.log(resutl) }).then(product => {
//             console.log(product)
//             return product
//         }).catch(err => {
//             console.log(err)
//         })
//     }
// }

// // const sequelize = require('../utils/database');

// // const Product = sequelize.define('product', {
// //     id: {
// //         type: Sequelize.INTEGER,
// //         autoIncrement: true,
// //         allowNull: false,
// //         primaryKey: true,
// //     },
// //     title: Sequelize.STRING,
// //     price: {
// //         type: Sequelize.DOUBLE,
// //         allowNull: false
// //     },
// //     imageUrl: {
// //         type: Sequelize.STRING,
// //         allowNull: false
// //     },
// //     description: {
// //         type: Sequelize.STRING,
// //         allowNull: false
// //     }
// // });

// module.exports = Product;