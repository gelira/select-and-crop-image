const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/baixar-foto', async (req, res) => {
  const { link } = req.body;
  try {
    const response = await axios.get(link, { responseType: 'arraybuffer' });
    const contentType = response.headers['content-type'];
    console.log(contentType);
    if (contentType.indexOf('image/') === -1) {
      return res.status(400).json({ message: 'O link não aponta para uma imagem' });
    }
    const buf = Buffer.from(response.data).toString('base64');
    return res.json({ src: `data:${contentType};base64,${buf}` });
  }
  catch {
    return res.status(400).json({ message: 'Erro no download do arquivo' });
  }
});

app.listen(3333);
