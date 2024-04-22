const path = require('path');
const fs = require('fs');

module.exports = class product{
    constructor(p){
        this.product = p;
    }

    save(){
        const p = path.join(path.dirname(require.main.filename),'data','product.json');
        fs.readFile(p,(err,filecontent)=>{
            let products= [];
            if(!err){
                products = JSON.parse(filecontent);
            }
            products.push(this);
            fs.writeFile(p,JSON.stringify(products), (err)=>{
                console.log(err)
            })
        })
     
    }

    static fetchData(cb){
        const p = path.join(path.dirname(require.main.filename),'data','product.json');
        fs.readFile(p,(err,filecontent)=>{
            if(err){
             cb([]);
            }else{
                cb(JSON.parse(filecontent));
            }
        })
    }
}