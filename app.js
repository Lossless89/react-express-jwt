// Bringing all the dependencies in
const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const exjwt = require('express-jwt');

// Добавление mongoose:
const mongoose = require('mongoose');
const logger = require('morgan');

// Instantiating the express app
const app = express();

// See the react auth blog in which cors is required for access
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Headers', 'Content-type, Authorization');
    next();
});

app.use(logger('tiny'));
// Setting up bodyParser to use json and set it to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// INstantiating the express-jwt middleware
const jwtMW = exjwt({
    secret: 'keyboard cat 4 ever'
});


//Определение Mongoose Schema (*схемы):

const todoSchema = mongoose.Schema({
    id: Number,
    text: String,
    state: Boolean
});

const Todo = mongoose.model('Todo', todoSchema);

const usersSchema = mongoose.Schema({
    email: String,
    pass: String
});

const Users = mongoose.model('User', usersSchema);


//Model for add new user:

const user = new Users({
    email: "admin@admin.ru",
    pass: "admin123"
});

user.save(function (err, user) {
    if (err) {
        console.log('USER NOT SAVED')
    }
    console.log('USER SAVED');
});

// LOGIN ROUTE
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    // Use your DB ORM logic here to find user and compare password
    Users
        .findOne({email: username})
        .then(user => {
            console.log(user);
            if (password == user.pass) {
                //If all credentials are correct do this
                let token = jwt.sign({ id: user.id, username: user.username }, 'keyboard cat 4 ever', { expiresIn: 129600 }); // Sigining the token
                res.json({
                    sucess: true,
                    err: null,
                    token
                });
            }
            else {
                res.status(401).json({
                    sucess: false,
                    token: null,
                    err: 'Username or password is incorrect'
                });
            }
        })
        .catch(e => {
            res.status(401).json({
                sucess: false,
                token: null,
                err: 'Username or password is incorrect'
            });
        });
});

app.get('/', jwtMW /* Using the express jwt MW here */, (req, res) => {
    res.send('You are authenticated'); //Sending some response when authenticated
});

// Error handling
app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') { // Send the error rather than to show it on the console
        res.status(401).send(err);
    }
    else {
        next(err);
    }
});


mongoose.connect('mongodb://localhost:27017/new_todo', {useNewUrlParser: true});

mongoose.connection.on('error', (err) => {
    console.error(err);
});

mongoose.connection.once('open', function () {
    console.log('DB is connected!');
});
// Starting the app on PORT 3000
const PORT = 8000;
app.listen(PORT, () => {
    // eslint-disable-next-line
    console.log(`Magic happens on port ${PORT}`);
});
