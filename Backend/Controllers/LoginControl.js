const Login = require('../Models/Login')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const SignUp = async (req, res, next) => {
    try {
        const hash = await bcrypt.hash(req.body.password, 10)
        const user = new Login({
            email: req.body.email,
            password: hash
        })
        await user.save()
        res.status(201).json({mes: "User created"})
        
    } catch (error) {
        res.status(500).json({error})
    }
}

const SignIn = async (req, res, next) => {
    try {
        const user = await Login.findOne({ email: req.body.email });
        if (user === null) {
            return res.status(401).json({ message: "Invalid Email!" });
        }

        const valid = await bcrypt.compare(req.body.password, user.password);
        if (!valid) {
            return res.status(401).json({ message: "Invalid Password!" });
        }

        res.status(200).json({
            userId: user._id,
            token: jwt.sign(
                { userId: user._id },
                process.env.ACCESS_TOKEN,
                { expiresIn: '1800s' }
            )
        });
    } catch (error) {
        res.status(500).json({ error });
    }
};

module.exports = {SignUp, SignIn}
