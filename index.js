const express = require("express");
const path = require("path");
const collection = require("./config");
const employee = require("./employee");
const bcrypt = require('bcrypt');

const app = express();
// convert data into json format
app.use(express.json());
// Static file
app.use(express.static("public"));

app.use(express.urlencoded({ extended: false }));
//use EJS as the view engine
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("login");
});

app.get("/signup", (req, res) => {
    res.render("signup");
});



// Register User
app.post("/signup", async (req, res) => {

    const data = {
        f_sno: req.body.slno,
        f_UserName: req.body.username,
        f_Pwd: req.body.password
    }

    // Check if the username already exists in the database
    const existingUser = await collection.findOne({ f_UserName: data.f_UserName });

    if (existingUser) {
        res.send('User already exists. Please choose a different username.');
    } else {
        // Hash the password using bcrypt
        const saltRounds = 10; // Number of salt rounds for bcrypt
        const hashedPassword = await bcrypt.hash(data.f_Pwd, saltRounds);

        data.f_Pwd = hashedPassword; // Replace the original password with the hashed one

        const userdata = await collection.insertMany(data);
        console.log(userdata);
        res.render("login");
    }

});

var emp;
// Login user 
app.post("/login", async (req, res) => {
    try {
        const check = await collection.findOne({ f_UserName: req.body.username });
         emp = check.f_UserName;
        if (!check) {
            res.send("User name cannot found")
        }
        // Compare the hashed password from the database with the plaintext password
        const isPasswordMatch = await bcrypt.compare(req.body.password, check.f_Pwd);
        if (!isPasswordMatch) {
            res.send("wrong Password");
        }
        else {
            const listEmployee = await employee.find();
            res.render("home",{empName:check.f_UserName});
        }
    }
    catch {
        res.send("wrong Details");
    }
});
app.get("/employees", async (req,res) =>{
    const users = await employee.find();
    res.send(users);
})

// Create Employee 
app.post("/employee", async (req, res) => {


    const data1 = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        designation: req.body.designation,
        gender: req.body.gender,
        course: req.body.course
    }

        const userdata1 = await employee.insertMany(data1);
        console.log(userdata1);
        res.render("home",{empName:emp});


});

// Define Port for Application
const port = 5000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
});