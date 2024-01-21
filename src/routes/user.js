const express = require("express");
const userSchema = require("../Modelos/user");

const router = express.Router();

// Crear usuario
router.post("/users", (req, res) => {
    const user = new userSchema(req.body);
    user
        .save()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Iniciar sesión
router.post("/login", async (req, res) => {
    try {
        const { name, password } = req.body;
        const user = await userSchema.findOne({ name, password });

        if (!user) {
            return res.status(401).json({ message: "Usuario incorrecto" });
        }

        // Generar y asignar una cadena de sesión 
        user.session = "Inicio de sesion valida";

        await user.save();

        res.json({ session: user.session });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;

// Este es el codigo para hacer el inicio correcto de sesion:
/*
Invoke-RestMethod -Uri "http://localhost:9000/api/login" -Method Post -Headers @{"Content-Type"="application/json"} -Body '{"name": "<Nombre del usuario>", "password": "<Colcar contraseña>"}'
*/

