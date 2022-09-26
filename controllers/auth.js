 const mysql = require("mysql")


 const bcrypt=require("bcryptjs");


 const db=mysql.createConnection({
    host:process.env.DATABASE_HOST,
    user:process.env.DATABASE_USER,
    password:process.env.DATABASE_PASS,
    database:process.env.DATABASE
})


 exports.register=(req,res)=>{
    // console.log(req.body);

    // const name= req.body.name;
    // const emaik= req.body.email;
    // const password= req.body.password;
    // const confirmpassword= req.body.conpassword;
    const {name,email,password,conpassword}=req.body;
    db.query('SELECT email FROM user WHERE email=?',[email],async (error,results)=>{
        if (error){
            throw error
        }
        if(results.length>0){
            return res.render('register',{
                message:'that email is already in use'
            })
        }else if(password !== conpassword){
            return res.render("register",{
                message:"password dont match"
            })
        }

        let hashedpassword= await bcrypt.hash(password,8);
        // console.log(hashedpassword);

        db.query("INSERT INTO user SET ?",{name:name,email:email,password:hashedpassword},(err,result)=>{
            if (err){
                console.log(err)
            }else{
                return res.render("register",{
                    message:"user registered"
                }) 
            }
        })

    }) 
   
}