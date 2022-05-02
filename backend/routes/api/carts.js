const express = require('express');
const Cart = require('../../models/Cart');
const Product = require('../../models/Product')
const Customer = require('../../models/Customer');
const session = require('express-session');
const router = express.Router()

router.post("/add/:id", async(req, res)=>{
    const productId = req.params.id;
    const {quantity} = req.body; 
    const sessCustomer = req.session.customer;
    if(sessCustomer){
        const cart = await Cart.findOne({
            customer: req.session.customer.id
        })
        const product = await Product.findById(productId)
        if(product.stockLevel < quantity){
            return res.status(409).send(`You cannot add this product to your cart as it has a stock level of ${product.stockLevel} and the quantity entered was ${quantity}`)
        }

        //prototype pattern example
        const newItem ={
            productId: product._id,
            name: product.name,
            quantity: quantity,
            price: product.price
        }

        const updateCart = await cart.update({
            $push:{
                items: newItem
            }
        })

        console.log(updateCart)


        
        //send back to client
        res.status(200).send(`Product named ${newItem.name} added to your cart`)
    }

    else{
        console.log("Not authorized to make this request")
        res.status(404).send("Unauthorized")
    }
})

router.get("/all", async (req, res)=>{
    const sessCustomer = req.session.customer;
    if(sessCustomer){
        const cart = await Cart.findOne({
            customer: req.session.customer.id
        })
        res.send({
            "cartItems": cart.items
        })
    }

    else{
        console.log("Not authorized to make this request")
        res.status(404).send("Unauthorized")
    }
})

router.delete("/remove/:id", async(req, res)=>{
    
})








module.exports = router;