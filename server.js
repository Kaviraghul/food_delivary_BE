import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import authRouter from "./routes/authenticationRoute.js";

// app config 

const app = express();
const port = 4000;

// db connection
connectDB();

// middlware
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("API working fine")
});

// api endpoints
app.use("/api/food", foodRouter);
app.use("/api/auth", authRouter);
app.use("/images", express.static('uploads'));

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
})

// mongodb+srv://deliveryapp:kavi@1997@cluster0.xs9kk.mongodb.net/?

// mongodb+srv://deliveryapp:kavi@1997@cluster0.xs9kk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

