const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const taskRouter =  require('./routes/tasks');
const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use(taskRouter);

module.exports = app;