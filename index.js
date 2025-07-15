const express=require('express');
const multer=require('multer');
const fs=require('node:fs')
const upload=multer({dest:'uploads/'});
const app=express();

app.post('/images/single', upload.single('imagenPerfil'), (req, res) => {
    console.log(req.file);
    res.send('Terminal');
    saveImage(req.file)
});

app.post('/images/multi',upload.array('photos',10),(req,res)=>{
    req.files.map(saveImage)
    res.send('Termina Multi')
})
// funcion para ver las imagenes

function saveImage(file){
 const newPath=`uploads/${file.originalname}`;
 fs.renameSync(file.path,newPath)
 return newPath
}

app.listen(3000,()=>{
    console.log("Servidor 3000")
});