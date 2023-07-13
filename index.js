//.............require all modul..................

const express =require("express");
const connection = require("./config/db")
const {userRouter}=require("./routes/user.routes")
const cors=require("cors")
const {router}=require("./routes/employee")
const app = express();

require("dotenv").config()
//...................use module..................
app.use(express.json());
app.use(cors())
const port=process.env.PORT|| 5059



//...............................$


app.get("/",(req,res)=>{
    res.send("<h1>welcome to Employee Management </h1>")
})

app.use("/",userRouter)
app.use("/employees",router)



//........... server is listen her ..............
app.listen(port,()=>{
    try {
        connection
        console.log('conected to DB')
    } catch (error) {
        console.log(error.message)
    }
    console.log(`port is runig ${port}`)
})