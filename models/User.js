const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    cart: {
        item: [
            {
                productId: {
                    type: Schema.Types.ObjectId,
                    ref: 'Product',
                    required: true
                },
                quantity: {
                    type: Number,
                    required: true
                }
            }
        ]
    }
})
UserSchema.methods.addToCart = function (product) {
    const cartProductIndex = this.cart.item.findIndex(cp => {
        return cp.productId.toString() === product._id.toString();
    });
    console.log(cartProductIndex)
    let newQuantity = 1;
    const updatedCartItems = [...this.cart.item];
    if (cartProductIndex >= 0) {
        console.log('exist')
        newQuantity = this.cart.item[cartProductIndex].quantity + 1;
        updatedCartItems[cartProductIndex].quantity = newQuantity;
        console.log(newQuantity)

    } else {
        console.log(newQuantity)
        updatedCartItems.push({ productId: new ObjectId(product._id), quantity: newQuantity })
    }
    const Updatecart = { item: updatedCartItems };
    this.cart = Updatecart
    return this.save();
}

UserSchema.methods.removeCart = function (productId) {
    console.log("idff", productId)
    const updatedCartItems = this.cart.item.filter(item => {
        console.log("ok", item.productId.toString())
        return item.productId.toString() !== productId.toString();
    })
    console.log('this', updatedCartItems)
    this.cart.item = updatedCartItems
    return this.save()
}
UserSchema.methods.clearCart = function () {
    this.cart = { item: [] };
    return this.save();
}
module.exports = mongoose.model('User', UserSchema)


// const { ObjectId } = require('mongodb');

// const getdb = require('../utils/database').getdb;


// module.exports = class User {
//     constructor(username, email, cart, id) {
//         this.user = username;
//         this.email = email;
//         this.cart = cart;
//         this._id = id;
//     }
//     save() {
//         const db = getdb();
//         let newdb;
//         newdb = db.collection('users').insertOne(this)
//         return newdb
//             .then(result => {
//                 console.log("Ok", result);
//             }).catch(err => {
//                 console.log(err);
//             })
//     }

//     addtoCart(product) {
//         const cartProductIndex = this.cart.item.findIndex(cp => {
//             return cp.productId.toString() == product._id.toString();
//         });
//         console.log(cartProductIndex)
//         let newQuantity = 1;
//         const updatedCartItems = [...this.cart.item];
//         if (cartProductIndex >= 0) {
//             console.log('exist')
//             newQuantity = this.cart.item[cartProductIndex].quantity + 1;
//             updatedCartItems[cartProductIndex].quantity = newQuantity;
//             console.log(newQuantity)

//         } else {
//             console.log(newQuantity)
//             updatedCartItems.push({ productId: new ObjectId(product._id), quantity: newQuantity })
//         }
//         const Updatecart = { item: updatedCartItems };
//         const db = getdb()
//         return db.collection('users').updateOne({ _id: new ObjectId(this._id) }, { $set: { cart: Updatecart } })
//     }

//     getCart() {
//         const db = getdb();
//         const productId = this.cart.item.map(i => {
//             return i.productId;
//         })
//         return db.collection('products').find({ _id: { $in: productId } }).toArray().then(product => {
//             return product.map(p => {
//                 return {
//                     ...p, quantity: this.cart.item.find(i => {
//                         return i.productId.toString() === p._id.toString();
//                     }).quantity
//                 }
//             })
//         })
//     }
//     deleteItemFromCart(productId) {
//         const updatedCartItems = this.cart.item.filter(item => {
//             return item.productId.toString() !== productId.toString();
//         })
//         const db = getdb()
//         return db.collection('users').updateOne({ _id: new ObjectId(this._id) }, { $set: { cart: { item: updatedCartItems } } })

//     }

//     addOrder() {
//         const db = getdb()
//         return this.getCart().then(products => {
//             const order = {
//                 item: products,
//                 user: {
//                     _id: new ObjectId(this._id),
//                     name: this.user
//                 }
//             }
//             return db.collection('order').insertOne(order)
//         }).then(result => {
//             this.cart = { item: [] };
//             return db.collection('users').updateOne({ _id: new ObjectId(this._id) }, { $set: { cart: { item: [] } } })
//         })
//     }
//     getOrder() {
//         const db = getdb();
//         return db.collection('order').find({ 'user._id': new ObjectId(this._id) }).toArray()
//     }
//     static findbyId(id) {
//         const db = getdb();
//         return db.collection('users').findOne({ _id: new ObjectId(id) }).then(user => {
//             console.log(user)
//             return user
//         }).catch(err => {
//             console.log(err);
//         })
//     }
// }