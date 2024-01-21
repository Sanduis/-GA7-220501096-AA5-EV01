const express = require("express");
const userSchema = require("../Modelos/user");

const router = express.Router();

// Iniciar sesión
router.post("/login", async (req, res) => {
    try {
        const { name, password } = req.body;

        // Buscar el usuario en la base de datos por el nombre de usuario
        const user = await userSchema.findOne({ name });

        if (user) {
            // Verificar si la contraseña proporcionada coincide con la almacenada
            if (password === user.password) {
                // Devolver un mensaje de inicio de sesión exitoso
                res.json({ message: "Inicio de sesión exitoso", user });
            } else {
                // Devolver un mensaje si la contraseña es incorrecta
                res.status(401).json({ message: "Credenciales incorrectas" });
            }
        } else {
            // Devolver un mensaje si el usuario no fue encontrado
            res.status(401).json({ message: "Usuario no encontrado" });
        }
    } catch (error) {
        // Manejar errores del servidor
        console.error(error);
        res.status(500).json({ message: "Error del servidor" });
    }
});

module.exports = router;