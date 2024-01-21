const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const userRoutes = require("./routes/user")

const app = express();
const puerto = process.env.PORT || 9000;

//middleware
app.use(express.json());
app.use("/api", userRoutes);


// Ruta
app.get("/", (req, res) => {
    res.send("Hola");
})

//Mongodb Coneccion
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log("conectado con mongoose atlas"))
    .catch((error) => console.error(error));

app.listen(9000, () => console.log("El server esta corriendo en el puerto 9000"));