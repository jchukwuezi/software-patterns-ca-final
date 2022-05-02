const express = require('express')
const router = express.Router()
const PurchaseHistory = require('../../models/PurchaseHistory')

router.get("/all/admin", async (req, res)=>{
    const sessAdmin = req.session.admin;

    if(sessAdmin){
        const history = await PurchaseHistory.find({})
        .populate({
            path: 'customer',
            select: 'name -_id'
        })

        res.send({
            "history": history
        })
    }

    else{
        console.log("Not authorized to make this request")
        res.status(404).send("Unauthorized")
    }
})

router.get("/all", async (req, res)=>{
    const sessCustomer = req.session.customer;
    
    if(sessCustomer){
        const history = await PurchaseHistory.find({})
        .where('customer').equals(req.session.customer.id)
        res.send({
            "history": history
        })
    }

    else{
        console.log("Not authorized to make this request")
        res.status(404).send("Unauthorized")
    }
})













module.exports = router;