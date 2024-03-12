const mongoose = require('mongoose');
const connect = mongoose.connect("mongodb://localhost:27017/pello");

// Check database connected or not
connect.then(() => {
    console.log("Database Connected Successfully");
})
.catch(() => {
    console.log("Database cannot be Connected");
});
const Loginschema = new mongoose.Schema({
    f_sno:{
        type:String,
        required: true,
        unique:true,
    },
    f_UserName: {
        type:String,
        required: true,
        unique: true,
    },
    f_Pwd: {
        type: String,
        required: true
    }
});




const collection = mongoose.model("user",Loginschema);


module.exports = collection;