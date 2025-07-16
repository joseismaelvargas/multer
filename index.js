const express = require('express');
const multer = require('multer');
const fs = require('node:fs');
const fsPromises = require('node:fs/promises');

if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}

const upload = multer({ dest: 'uploads/' });
const app = express();

app.use('/uploads', express.static('uploads'));

app.post('/images/single', upload.single('imagenPerfil'), async (req, res) => {
  console.log(req.file);
  await saveImage(req.file);
  res.send('Imagen individual recibida');
});

app.post('/images/multi', upload.array('photos', 10), async (req, res) => {
  await Promise.all(req.files.map(saveImage));
  res.send('Imágenes múltiples recibidas');
});

async function saveImage(file) {
  try {
    const newPath = `uploads/${file.originalname}`;
    await fsPromises.rename(file.path, newPath);
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
