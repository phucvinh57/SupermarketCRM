const express = require('express');
const cors = require('cors');
const db = require('./app/models/index');
const app = express();
const router = require('./app/router/router');

app.use(express.json());
app.use(express.urlencoded({extended :true}));

var corsOptions = {
    origin: "http://localhost:3000"
};
app.use(cors(corsOptions));
db.sequelize.sync({force: false}).then(() => {
    console.log('Sync database');
});

app.use('/api', router);
app.get('/', function(req, res) {
    res.send({msg: 'Welcome to Node.js'});
})

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});