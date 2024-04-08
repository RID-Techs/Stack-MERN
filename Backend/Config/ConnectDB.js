const mongoose = require('mongoose')

const DbConnection = async () =>{
    try {
        const DB = await mongoose.connect(process.env.CONNECTION_STRING)
        console.log("Connected to : ",
        DB.connection.host, DB.connection.name)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}
module.exports=DbConnection;