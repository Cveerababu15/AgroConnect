const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
require("dotenv").config()

const authRoutes = require("./routes/authRoutes.js")
const productRoutes = require("./routes/productRoutes.js")
const orderRoutes = require("./routes/orderRoutes.js")
const app = express()
app.use(express.json())

app.use("/", (req, res) => {
    res.send("AgroConnect Backend is Running Successfully!")
})
app.use(cors({
    origin: ["https://agro-connect-ten.vercel.app", "http://localhost:5173"],
    credentials: true
}));


app.use("/api/auth", authRoutes)

// Products
app.use("/api/products", productRoutes)


// Restaurant Orders
app.use("/api/orders", orderRoutes)

mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log("MongoDB is Connected SuccessFully")
    })
    .catch(err => console.error(err))

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Serer is Running on port ${PORT}`)
})