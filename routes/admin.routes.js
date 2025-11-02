const {Router} = require('express')
const adminRouter= Router()
const {AdminModel} = require('../db')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const {z, email} = require('zod')
const bcrypt = require('bcrypt')

dotenv.config()

function authMiddleware(req, res, next){
    const token = req.headers.token
    const decodedData= jwt.verify(token, process.env.JWT_SECRET)

    if(decodedData){
        
    }

}

adminRouter.post('/signup', async (req, res) => {
    const requiredBody = z.object({
        firstName : z.string(),
        lastName : z.string(),
        email : z.email().string(),
        password : z.string().min(5).max(20)
    })

    const parsedData = requiredBody.safeParse(req.body)

    if(!parsedData.success){
        res.json({
            message : "invalid inputs",
            error : parsedData.error
        })
        return
    }

    const firstName = req.body.firstName
    const lastName = req.body.lastName
    const email = req.body.email
    const password = req.body.password

    try {
        const hashPassword = await bcrypt.hash(password, JWT_SECRET)
        await AdminModel.create({
            firstName : firstName,
            lastName : lastName,
            email : email,
            password : hashPassword
        })
    } catch (error) {
        res.json({
          message: "sign-up failed",
          error: error,
        });
        return;
    }

    res.json({
        message : "sign-up completed"
    })

})

adminRouter.post('signin', async (req, res) => {
    const requiredBody = z.object({
        email : z.string().email(),
        password : z.string().min(5).max(20)
    })

    const parsedData = requiredBody.safeParse(req.body)
    if(!parsedData.success){
        res.json({
            message : "invalid email or password",
            error : parsedData.error
        })
        return
    }

    const email = req.body.email
    const password = req.body.password

    const user = await AdminModel.findOne({
        email : email
    })

    if(!user){
        res.json({
            message : "user doesnot exist"
        })
        return
    }

    const passwordMatch = bcrypt.compare(password, user.password)

    if(parsedData){
        const token = jwt.sign({
            id : user.id
        }, JWT_SECRET)

        res.json({
            message : token
        })
    }

    res.status(403).json({
      message: "incorrect email or password",
    });

    



    


})

adminRouter.post('/course', (req, res) => {

})

adminRouter.put('/course', (req, res) => {

})

adminRouter.get('/course/bulk', (req, res) => {
    
})

adminRouter.post('/addcontent', (req, res) => {

})

module.exports = {
    adminRouter : adminRouter
}