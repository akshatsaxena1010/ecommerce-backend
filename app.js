const Express = require('express');

const app = Express();
const apiRouter = require('./src/api');
require('dotenv').config();

const port = process.env.NODEJS_PORT || '8000';

app.use(Express.json());
app.use('/', apiRouter);

app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});
