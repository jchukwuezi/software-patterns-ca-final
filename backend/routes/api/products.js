const express = require('express')
const Product = require('../../models/Product')
const router = express.Router()

router.get("/", async (req, res)=>{
    const sessCustomer = req.session.customer;
    if(sessCustomer){
        const products = await Product.find({ stockLevel: {$gte:0}})
        res.send(products)
    }

    else{
        console.log("Not authorized to make this request")
        res.status(404).send("Unauthorized")
    }
})

router.get("/admin", async (req, res)=>{
    const sessAdmin = req.session.admin;
    if(sessAdmin){
        const products = await Product.find({})
        res.send(products)
    }

    else{
        console.log("Not authorized to make this request")
        res.status(404).send("Unauthorized")
    }
})

router.get("/:id/admin", async (req, res)=>{
    const sessAdmin = req.session.admin;
    const productId = req.params.id;
    if(sessAdmin){
        const product = await Product.findById(productId)
        res.send(product)
    }

    else{
        console.log("Not authorized to make this request")
        res.status(404).send("Unauthorized")
    }
})

router.get("/:id", async (req, res)=>{
    const sessCustomer = req.session.customer;
    const productId = req.params.id;
    if(sessCustomer){
        const product = await Product.findById(productId)
        res.send(product)
    }
    
    else{
        console.log("Not authorized to make this request")
        res.status(404).send("Unauthorized")
    }
})


router.post("/add", async (req, res)=>{
    const sessAdmin = req.session.admin;
    if(sessAdmin){
        const {name, price, category, manufacturer} = req.body;

        if(!name || !price || !category || !manufacturer){
            res.send('Make sure all of the fields are filled')
        }
    
        const product = await Product.findOne({
            name: name,
            category: category
        })
    
        if(product){
            res.status(409).send('Product with this name and category already exists')
        }
    
        const newProduct = new Product({
            name,
            price,
            category,
            manufacturer
        })
   
        await newProduct.save()
        .catch((err)=>{
            console.log(err)
            res.send({"Adding error " : err})
        })

        res.status(200).send('New product created')
        console.log("New product created")
    }

    else{
        console.log("Not authorized to make this request")
        res.status(404).send("Unauthorized")
    }
})

router.post("/update/:id", (req, res)=>{
    const productId = req.params.id;
    

})


router.delete("/:id")











module.exports = router;