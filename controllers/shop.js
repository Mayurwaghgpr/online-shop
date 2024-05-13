const { where } = require("sequelize");
// const Cart = require("../models/cart");
const Product = require("../models/product");
const Order = require("../models/order");

exports.getProducts = (req, res) => {
  Product.find().then(products => {
    console.log("check:", products)
    res.render('shop/productList', {
      prods: products,
      path: '/products',
      pageTitle: 'All Products',
      isAuthenticated:req.session.isLoggedIn
    });
  })
}
exports.getProductDtl = (req, res) => {
  const prodId = req.params.productId;
  console.log('so', req.params)
  Product.findById(prodId).then(product => {
    console.log("neww", product)
    res.render('shop/product-detail', {
      prods: product,
      path: '/products',
      pageTitle: product.title,
     isAuthenticated:req.session.isLoggedIn
    });
  })

  // Product.findByPk(prodId).then(product => {
  //   console.log("neww", product)
  //   res.render('shop/product-detail', {
  //     prods: product,
  //     path: '/products',
  //     pageTitle: product.title,
  //   });
  // })

}
exports.getIndex = (req, res) => {
  Product.find().then(products => {
    res.render('shop/index', {
      prods: products,
      path: '/',
      pageTitle: 'Shop',
     isAuthenticated:req.session.isLoggedIn
    });
  }).catch(err => console.log(err));

}

exports.getCart = (req, res) => {
  req.user.populate('cart.item.productId').then(products => {
    console.log(products.cart.item)
    res.render('shop/cart', {
      path: '/cart',
      pageTitle: 'Your Cart',
      cartItems: products.cart.item,
     isAuthenticated: req.session.isLoggedIn
    })
  })
  // Cart.getCart(cartprod => {
  //   Product.fetchData(prods => {
  //     const cart = []
  //     prods.forEach(prod => {
  //       const cartproduct = cartprod.products.find(cartprod => cartprod.id === prod.id)
  //       if (cartproduct) {
  //         cart.push({ product: prod, qty: cartproduct.qty })
  //       }
  //     });
  //     res.render('shop/cart', {
  //       path: '/cart',
  //       pageTitle: 'Your Cart',
  //       cartItems: cart
  //     })

  //   })

  // })

}
exports.postCart = (req, res) => {
  const prodId = req.body.productId;
  Product.findById(prodId).then(product => {
    return req.user.addToCart(product);
  }).then(() => {
    res.redirect('/cart');
  })
    .catch(err => console.log(err))
}
// let fetchedCart;
// let newQuantity = 1;
// console.log(prodId);
// req.user.getCart()
//   .then(cart => {
//     fetchedCart = cart;
//     return cart.getProducts({ where: { id: prodId } });
//   })
//   .then(products => {
//     let product;
//     if (products.length > 0) {
//       product = products[0];
//     }
//     if (product) {
//       const oldQty = product.cartItem.quantity;
//       newQuantity = oldQty + 1;
//       return product;
//     }
//     return Product.findByPk(prodId);
//   })
//   .then(product => {
//     return fetchedCart.addProduct(product, { through: { quantity: newQuantity } });
//   })
//   .then(() => {
//     res.redirect('/cart');
//   })
//   .catch(err => console.log(err))
exports.deleteCartItem = (req, res) => {
  const prodId = req.body.productId;
  console.log(prodId)
  req.user.removeCart(prodId)
    .then(result => {
      res.redirect('/cart');
    })
  // Product.fetchId(prodId, product => {
  //   console.log('newprod', prodId)
  //   Cart.removeProduct(prodId, product.price)
  // })
}

exports.postOrders = (req, res) => {
  req.user.populate('cart.item.productId')
    .then(user => {
      const products = user.cart.item.map(i => {
        return { quantity: i.quantity, product: {...i.productId._doc} };
      })
      const order = new Order({
        user: {
          name: req.user.name,
          userId: req.user
        },
        products: products
      })
      return order.save()
    })
    .then(() => {
      return req.user.clearCart();

    }).then(() => {
      res.redirect('/orders')
    })
}

exports.getOrders = (req, res) => {
  Order.find({ 'user.userId': req.user._id }).then(order => {
    console.log('order', order)
    res.render('shop/orders.ejs', {
      path: '/orders',
      pageTitle: 'Orders',
      orders: order,
      isAuthenticated:req.session.isLoggedIn
    })
  })

}
exports.getCheckout = (req, res) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'checkout'
  })
}