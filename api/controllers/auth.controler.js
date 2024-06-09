import bcrypt from "bcrypt";
import prisma from "../lib/prisma.js";
export const register = async (req,res) => {
    const {username,email,password} = req.body;
    try{
    const hashedPassword = await bcrypt.hash(password,10)
    console.log(hashedPassword)
    const newUser = await prisma.user.create({
        data:{
            username,
            email,
            password:hashedPassword
        }
    })

    console.log(newUser)
    res.status(201).json({message:"user created Successfully"});
}catch(err){
    console.log(err)
    res.status(500).json({message:"Failed to create user!"})
}
}

export const login = async (req,res) => {
    const {username,password} = (req.body);
    try{
        const user = await prisma.user.findUnique({
            where:{username}
        })
        if(!user) return res.status(401).json({message:"Invalid credentials!"})

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid) return res.status(401).json({message:"Invalid Credentials!"}) 
        
        const age = 1000 * 60 * 60 * 24 * 7
        // res.setHeader("Set-Cookie","test="+"myValue").json("success")
        res.cookie("test2","myValue",{
            httpOnly:true,
            // secure:true,
            maxAge:age
        }).status(200).json({message:"login Successfull"})
    }catch(err){
        console.log(err);
        res.status(500).json({message:"Falied to login!"})
    }
}
export const logout = (req,res) => {
    
}