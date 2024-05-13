const { ObjectId } = require("mongodb");
const Product = require("../models/product");

exports.getProducts = (req, res) => {
    console.log(req)
    Product.find().then(products => {
        console.log(products)
        res.render('admin/products', {
            prods: products,
            path: '/',
            pageTitle: 'Admin Products',
            path: '/admin/products',
            isAuthenticated:req.session.isLoggedIn,
        })
    })

}
exports.getAddProducts = (req, res) => {
    res.render('admin/edit-products', {
        pageTitle: 'Products',
        path: 'admin/add-product',
        editting: false,
          isAuthenticated:req.session.isLoggedIn,
    });
}

exports.postAddProducts = (req, res) => {
    const { product, imageUrl, price, description } = req.body;
    console.log("user", req.body)
    const products = new Product({ title: product, price: price, imageUrl: imageUrl, description: description, UserId: req.user._id });
    products.save().then(result => {
        res.redirect('/admin/products')
    }).catch(err => {
        console.log(err);
    });

    // req.user.createProduct();
    // req.user
    //     .createProduct({
    //         title: product,
    //         price: price,
    //         imageUrl: imageUrl,
    //         description: description,
    //     }).then(result => {
    //         res.redirect('/admin/products')
    //     })
    //     .catch(err => {
    //         console.log(err);
    //     });
}
exports.getEditProducts = (req, res) => {
    const editmod = req.query.edit;
    console.log(editmod)
    if (!editmod) {
        res.redirect('/')
    }
    const prodId = req.params.productId;
    const id = prodId.split(':')[1]
    console.log("id", id)
    // Product.findByPk(id)
    Product.find({ _id: new ObjectId(id) }).then(product => {
        if (!id) {
            res.redirect('/');
        }
        console.log(product)
        res.render('admin/edit-products', {
            path: 'admin/edit-product',
            pageTitle: 'Edit Products',
            editting: editmod,
            prods: product[0],
              isAuthenticated:req.session.isLoggedIn,
        });

    })
}
exports.postEditProducts = (req, res) => {
    const { id, product, imageUrl, price, description } = req.body;
    const updatedProduct = { title: product, price: price, imageUrl: imageUrl, description: description }
    console.log("editu:", "ds" + id, product, price, description)
    Product.updateOne({ _id: new Object(id) }, updatedProduct).then(result => {
        console.log(result)
    })
        // Product.findByPk(id).then(prod => {
        //     prod.title = product;
        //     prod.price = price;
        //     prod.description = description;
        //     prod.imageUrl = imageUrl;
        //     prod.save();

        // })
        .catch(err => console.log(err))
    res.redirect('/admin/products');
}

exports.deleteProduct = (req, res) => {
    const prodId = req.body.productId;
    console.log(prodId)
    Product.deleteOne({ _id: new ObjectId(prodId) }).then(result => {
        console.log(result)
    })
        .then(result => {
            console.log('DELETED Product');
            res.redirect('/admin/products');
        }).catch(err => {
            console.log(err)
        })

}
