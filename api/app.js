
import express from "express";

const app = express();

app.use("/api/test",(req,res) => 
    res.send("test")
)

app.listen(5000,() => {
    console.log("Server is running");
})