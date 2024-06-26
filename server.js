require('rootpath')();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const errorHandler = require('_middleware/error-handler');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

const corsOptions = {
    origin: (origin, callback) => {
        console.log('CORS request from origin:', origin);
        callback(null, true);
    },
    credentials: true
};

app.use(cors(corsOptions));

// Log every request for debugging
app.use((req, res, next) => {
    console.log(`Received request: ${req.method} ${req.url}`);
    next();
});

app.use('/accounts', require('./accounts/accounts.controller'));
app.use('/foods', require('./foods/food.controller'));
app.use('/traditions', require('./traditions/tradition.controller'));

app.use('/api-docs', require('_helpers/swagger'));

app.use(errorHandler);

const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;
app.listen(port, () => console.log('Server listening on port ' + port));
