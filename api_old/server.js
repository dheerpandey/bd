const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const router = express.Router();
const routes = require('./src/routes');

const app = express();
const PORT = 3000;

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(function (err, req, res, next) {
  console.error(err)
  res.status(500).send('Something broke!')
});

app.use('/api', routes)
 
app.listen(PORT, () => console.log(`app listening on port ${PORT}!`));

module.exports = {
  app
}