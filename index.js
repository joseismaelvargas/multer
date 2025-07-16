const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;
app.get('/', (req, res) => res.send('Servidor OK'));

app.listen(PORT, () => {
  console.log(`Servidor corriendo e dn el puerto ${PORT}`);
});