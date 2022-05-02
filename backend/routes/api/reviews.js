const express = require('express')
const router = express.Router()
const Review = require('../../models/Review')

router.post("/add/:productId", async(req, res)=>{
    const sessCustomer = req.session.customer
    const {body, rating} = req.body;
    const productId = req.params.productId;
    if(sessCustomer){
        if(!body || !rating){
            res.status(404).send("Make sure all fields are filled")
            console.log("Fill all fields")
        }

        const newReview = new Review({
            body: body,
            rating: rating,
            product: productId,
            customer: req.session.customer.id
        })

        await newReview.save()
        console.log('Review created')
        res.status(200).send(`Review on product has been made`)
    }

    else{
        console.log("Not authorized to make this request")
        res.status(404).send("Unauthorized")
    }
})

router.get("/get", async (req, res)=>{
    const sessCustomer = req.session.customer
    if(sessCustomer){
        const reviews = await Review.find({})
        .where('customer').equals(req.session.customer.id)
        .populate({
            path: 'product',
            select: 'name -_id'
        })

        res.send({
            "reviews": reviews
        })
    }

    else{
        console.log("Not authorized to make this request")
        res.status(404).send("Unauthorized")
    }
})

router.delete("/delete/:id", async(req, res)=>{
    const sessCustomer = req.session.customer
    const reviewId = req.params.id;
    if(sessCustomer){
        const review = await Review.findByIdAndDelete(reviewId)
        if(!review){
            res.status(404).send('Review not found')
        }
        res.status(200).send('Review deleted')
    }

    else{
        console.log("Not authorized to make this request")
        res.status(404).send("Unauthorized")
    }
})

router.get("/get/:productId/admin", async(req, res)=>{
    const sessAdmin = req.session.admin
    if(sessAdmin){

    }

    else{
        console.log("Not authorized to make this request")
        res.status(404).send("Unauthorized")
    }
})

router.get("/get/admin", async(req, res)=>{
    const sessAdmin = req.session.admin
    if(sessAdmin){
        const reviews = await Review.find({})
        .populate([
            {path: 'product', select: 'name -_id'},
            {path: 'customer', select: 'name -_id'}
        ])
        console.log(reviews)

        res.send({
            "reviews": reviews
        })
    }

    else{
        console.log("Not authorized to make this request")
        res.status(404).send("Unauthorized")
    }
})










module.exports = router;