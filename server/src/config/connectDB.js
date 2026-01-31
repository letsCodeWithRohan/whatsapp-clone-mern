const mongoose = require("mongoose")

const connectDB = () => {
    mongoose.connect(`${process.env.DB_URL}/chatapp`)
    .then(() => {
        console.log("Connected to MongoDB successfully");
    })
    .catch((error)=>{
        console.log(error.message);
    })
}

module.exports = connectDB