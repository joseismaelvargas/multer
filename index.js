const express = require('express');
const multer = require('multer');
const fs = require('node:fs');

if (!fs.existsSync('uploads')) {
    fs.mkdirSync('uploads');
}

const upload = multer({ dest: 'uploads/' });
const app = express();

// Servir archivos estáticos desde /uploads
app.use('/uploads', express.static('uploads'));

app.post('/images/single', upload.single('imagenPerfil'), (req, res) => {
    console.log(req.file);
    saveImage(req.file);
    res.send('Imagen individual recibida');
});

app.post('/images/multi', upload.array('photos', 10), (req, res) => {
    req.files.map(saveImage);
    res.send('Imágenes múltiples recibidas');
});

function saveImage(file) {
    try {
        const newPath = `uploads/${file.originalname}`;
        fs.renameSync(file.path, newPath);
        return newPath;
    } catch (err) {
        console.error('Error al guardar imagen:', err);
        return null;
    }
}

app.get("/", (req, res) => {
    console.log("correctamente");
    res.send("Servidor en Railway funcionando correctamente.");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});