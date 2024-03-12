const mongoose = require('mongoose');
const connect = mongoose.connect("mongodb://localhost:27017/pello");

// Check database connected or not
connect.then(() => {
    console.log("Database Connected Successfully");
})
.catch(() => {
    console.log("Database cannot be Connected");
});

const employeeSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true,
    },
    email: {
        type:String,
        required: true,
        unique: true,
    },
    phone: {
        type: String,
        required: true
    },
    designation:{
        type: String,
       
    },
    gender:{
        type: String,
       
    },
    course:{
        type: Array,
        
    }
},{timestamps:true});

const employee = mongoose.model("employees",employeeSchema);
module.exports = employee;