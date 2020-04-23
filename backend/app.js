const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/baixar-foto', async (req, res) => {
  const { link } = req.body;
  
  const response = await axios.get(link, { responseType: 'arraybuffer' });
  const buf = Buffer.from(response.data).toString('base64');
  const contentType = response.headers['content-type'];

  return res.json({ src: `data:${contentType};base64,${buf}` });
});

app.listen(3333);
