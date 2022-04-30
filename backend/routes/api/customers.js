const express = require('express')
const Customer = require('../../models/Customer')
const bcrypt = require('bcryptjs')
const router = express.Router()


router.post("/register", (req, res)=>{
    const {name, username, address, password} = req.body;
    console.log('Register is being attempted')

    if(!name || !username || !password || !address){
        return res.status(400).send('Please enter all fields');
    }

    Customer.findOne({username: username}).then((customer)=>{
        if(customer){
            console.log("a dupilcate has been found, hopefully the client sees this error")
            return res.status(400).send({error: 'Customer already exists'})
        }
        else{
            //prototype pattern to create an customer
            const newCustomer = new Customer({
                name,
                username,
                address,
                password
            })

            //hashing the password
            bcrypt.genSalt((err, salt) =>{
                bcrypt.hash(newCustomer.password, salt, async(err, hash)=>{
                    if(err) throw err;
                    newCustomer.password = hash;
                    await newCustomer.save();
                    res.status(200).send('New customer created')
                    console.log("New customer created")
                })
            })
        }
    })
})

router.post("/login", (req, res)=>{
    const {username, password} = req.body;
    console.log('Login is being attempted')
    if(!username || !password){
        return res.status(400).send('Please enter all fields')
    }

    Customer.findOne({ username }).then((customer) => {
        if(!customer) return res.status(400).send('User does not exist')

        bcrypt.compare(password, customer.password).then((isMatch) => {
            if(!isMatch) return res.status(400).send('Invalid credentials')
            const sessCustomer = {
                id: customer._id,
                username: customer.username,
                name: customer.name
            }
            req.session.customer = sessCustomer;
            req.session.save();

            console.log('Details of the entire session')
            console.log(req.session)

            res.status(200).send(`${sessCustomer.name} has successfully logged in to the application`)
            console.log('User has been found')
        })
    })
})

//singleton pattern to find user in session
router.get("/auth/customer", (req, res)=>{
    const sessCustomer = req.session.customer;
    if (sessCustomer){
        console.log("Customer was found")
        res.send(sessCustomer)
    }

    else{
        console.log("No Customer was found")
        res.status(401).send('Unauthorized')
    }
})

router.delete("/logout", (req, res)=>{
    req.session.destroy((err)=>{
        if(err) throw err;
        res.clearCookie("session-id")
        res.send("Logged out successfully")
    })
})









module.exports = router;