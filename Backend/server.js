const express = require('express')
const LoginRoutes = require('../Backend/Routes/LoginRoute')
const UsersRoute = require("../Backend/Routes/UserRoutes")
const dotenv = require('dotenv').config();
const DbAccess = require('../Backend/Config/ConnectDB')

DbAccess();

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use("/auth", LoginRoutes)
app.use("/info", UsersRoute)

app.listen(port, () => {
    console.log( `Server is running on http://localhost:${port}` )
})
