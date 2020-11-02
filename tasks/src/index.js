const app = require('./app');
const client = require('./db');

(async () => {
  try {
    await client.connect();
    console.log('Connected to PostgreSQL DB');
  } catch (err) {
    console.error(err);
    client.end();
  }

  app.listen(4001, () => {
    console.log('Listening on 4001');
  });
})();



