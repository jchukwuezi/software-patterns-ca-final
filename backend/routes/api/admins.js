const express = require('express')
const Admin = require('../../models/Admin')
const bcrypt = require('bcryptjs')
const router = express.Router()

router.post("/register", (req, res)=>{
    const {name, username, password} = req.body;
    console.log('Register is being attempted')

    if(!name || !username || !password){
        return res.status(400).send('Please enter all fields');
    }

    Admin.findOne({username: username}).then((admin)=>{
        if(admin){
            console.log("a dupilcate has been found, hopefully the client sees this error")
            return res.status(400).send({error: 'Admin already exists'})
        }
        else{
            //prototype pattern to create an admin
            const newAdmin = new Admin({
                name,
                username,
                password
            })

            //hashing the password
            bcrypt.genSalt((err, salt) =>{
                bcrypt.hash(newAdmin.password, salt, async(err, hash)=>{
                    if(err) throw err;
                    newAdmin.password = hash;
                    await newAdmin.save();
                    res.status(200).send('New admin created')
                    console.log("New admin created")
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

    Admin.findOne({ username }).then((admin) => {
        if(!admin) return res.status(400).send('User does not exist')

        bcrypt.compare(password, admin.password).then((isMatch) => {
            if(!isMatch) return res.status(400).send('Invalid credentials')
            const sessAdmin = {
                id: admin._id,
                username: admin.username,
                name: admin.name
            }
            req.session.admin = sessAdmin;
            req.session.save();

            console.log('Details of the entire session')
            console.log(req.session)

            res.status(200).send(`${sessAdmin.name} has successfully logged in to the application`)
            console.log('User has been found')
        })
    })
})

//singleton pattern to find user in session
router.get("/auth/admin", (req, res)=>{
    const sessAdmin = req.session.admin;
    if (sessAdmin){
        console.log("Admin was found")
        res.send(sessAdmin)
    }

    else{
        console.log("No Admin was found")
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