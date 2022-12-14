const Express = require('express');

const app = Express();
const apiRouter = require('./src/api');
require('dotenv').config();

const port = process.env.NODEJS_PORT || '8000';

app.use(Express.json());
app.use('/api', apiRouter);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Listening to requests on http://localhost:${port}`);
});
