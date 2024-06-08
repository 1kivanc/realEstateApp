
import express from "express";
import cookieParser from "cookie-parser";
import authRoute from "./routes/auth.route.js";
import postRoute from "./routes/post.route.js";

const app = express();
app.use(cookieParser())

app.use(express.json())

app.use("/api/post",postRoute);
app.use("/api/auth",authRoute);


app.listen(5000,() => {
    console.log("Server is running");
})