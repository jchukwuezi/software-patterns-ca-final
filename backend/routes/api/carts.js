const express = require('express');
const Cart = require('../../models/Cart');
const Product = require('../../models/Product')
const Customer = require('../../models/Customer');
const PurchaseHistory = require('../../models/PurchaseHistory')
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

router.post("/checkout", async (req, res)=>{
    const sessCustomer = req.session.customer;
    if(sessCustomer){

        let totalCost = 0;

        const cart = await Cart.findOne({
            customer: req.session.customer.id
        })

        //find total cost of cart
        for (let i=0; i<cart.items.length; i++){
            const cost = cart.items[i].price * cart.items[i].quantity;
            totalCost+=cost;
        }

        await cart.items.forEach(async (item)=>{
            await Product.findByIdAndUpdate(
                item.productId,
                {$inc: {stockLevel: -item.quantity}}
            )
            console.log("Product updated")
        })

        const newPurchase = new PurchaseHistory({
            customer: req.session.customer.id,
            items: cart.items,
            bill: totalCost
        })

        await newPurchase.save()

        //deleting cart
        await Cart.findByIdAndDelete(cart._id)

        res.status(200).send(`Purchase of ${newPurchase.totalCost} has been made. Cart has been deleted`)


    }

    else{
        console.log("Not authorized to make this request")
        res.status(404).send("Unauthorized")
    }
})

router.delete("/remove/:id", async(req, res)=>{
    
})








module.exports = router;