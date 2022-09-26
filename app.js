const Express =require("express");
const app=Express();
const mysql=require("mysql");
const path=require("path");

const dotenv=require("dotenv");
dotenv.config({path:"./.env"});



const db=mysql.createConnection({
    host:process.env.DATABASE_HOST,
    user:process.env.DATABASE_USER,
    password:process.env.DATABASE_PASS,
    database:process.env.DATABASE
})

db.connect((error)=>{
    if(error){
        console.log(error);
    }else{
        console.log("connected to database successfully")
    }
})

app.set("view engine","hbs");
const publicdirectory=path.join(__dirname,"./public");
app.use(Express.static(publicdirectory));

app.use(Express.urlencoded({extended:false}));
app.use(Express.json())


// app.get("",(req,res)=>{
//     res.render("index")
// })
// app.get("/register",(req,res)=>{
//     res.render("register")
// })

//define routes
app.use('/',require('./routes/pages'))
app.use('/auth',require('./routes/auth'))

app.listen(8009,()=>{
    console.log("server started on port 8009");
});