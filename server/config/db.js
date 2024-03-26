const mongoose = require("mongoose");

const connect = async()=>{
   
        const con = await mongoose.connect(process.env.MONGO_URI);
        console.log(`mongodb connected ${con.connection.host}`)
}

module.exports = {connect};