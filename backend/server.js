const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser')
const router = require('./app/router');
const app = express();

const corsOptions = {
    origin: "http://localhost:3000",
    credentials: true
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));

app.use('/customer', router.customer);
app.use('/staff', router.staff)
app.use('/auth', router.auth);

app.get('/', function (req, res) {
    res.send({ msg: 'Welcome to Supermarket CRM' });
})

// Set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});