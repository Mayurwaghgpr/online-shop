const Product = require("../models/product");

exports.getAddProducts=(req,res)=>{
    res.render('add-product',{
    path:'/admin/add-product',
    pageTitle:'Products',
    fromsCSS: true,
    processCSS:true,
    activeAddProduct: true
    });
}

exports.postAddProducts=(req,res)=>{
    const product =new Product(req.body.product);
    console.log(product)
    product.save()
    res.redirect('/');
}

exports.getProducts=(req, res) => {
Product.fetchData(products=>{ res.render('shop',{
    prods:products,
    path: '/',
    pageTitle:'Shop',
    hasProducts: products.length >0,
    activeShop: true,
    productCSS: true
});
console.log(products);});
  }
