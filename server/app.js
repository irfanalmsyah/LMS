const express = require('express');
const app = express();
const cors = require('cors');
const routes = require('./routes');
const morgan = require('morgan');

app.use(morgan('dev'));
app.use(express.json());
app.use(cors({ origin: 'http://localhost' }));
app.use('/', routes);

app.listen(3000, () => console.log('Listening http://localhost:3000'));