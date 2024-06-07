const http = require("http");
const express = require("express");
const session = require('express-session');
const mysql = require("mysql2");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const path = require("path");
const port = process.env.PORT || 8000;
const app = express();

// Load environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, '.env') });

const loginHandler = require('./server/authentication/loginHandler');
const signUpHandler = require('./server/authentication/signUpHandler');
const addCollectionEntry = require('./server/collections/addCollectionEntry');
const createCollection = require('./server/collections/createCollection');
const createCollectionFromTemplate = require('./server/collections/createCollectionFromTemplate');
const getCollectionData = require('./server/collections/getCollectionData');


// Middleware to parse JSON bodies
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));
app.use(express.json());
app.use(express.static("public"));
app.use("/page", express.static(__dirname + "/views/pages"));
app.use("/css", express.static(__dirname + "/public/css"));
app.use("/js", express.static(__dirname + "/public/js"));
app.use("/img", express.static(__dirname + "/public/assets/img"));


// Set the view engine to use EJS
app.set('view engine', 'ejs');

const server = http.createServer(app);

// Route for homepage
app.get("/", async function(req, res) {
    res.render("index.ejs");
});

// Route for login
app.get('/login', (req, res) => {
    res.render('pages/login');
});

app.post('/login', loginHandler, (req, res) => {
    if (req.session.username) {
        res.redirect('/home'); // Redirect to home after successful login
    } else {
        res.redirect('/login'); // Redirect back to login if session is not set
    }
});

// Route for Sign-Up
app.get('/signup', (req, res) => {
    res.render('pages/signup');
});

app.post('/signup', signUpHandler, function(req, res) {
    res.render('/pages/home')
})

app.get('/home', (req, res) => {
    if (!req.session.username) {
        return res.redirect('/login'); // Redirect to login if no session username
    }
    res.render('pages/home', { username: req.session.username }); // Pass the session username to the template
});

/*
app.get('/home/:username', async (req, res) => {
    const username = req.params.username;
    if (req.session.username !== username) {
        return res.status(403).send('Unauthorized access');
    }
    try {
        const collectionNames = await getCollectionNames(username);
        res.render('pages/home', { username: username, collections: collectionNames });
    } catch (err) {
        console.error(err);
        res.render('pages/home', { username: username });
    }
});
*/

app.post('/create-collection', createCollection, function(req, res) {

});

app.post('/add-collection-entry', addCollectionEntry, function(req, res) {

});

app.get('/settings', (req, res) => {
    res.render('pages/account-settings');
});

app.get('/collection-data/:collectionName', async (req, res) => {
    const username = req.session.username;
    const tableName = req.params.collectionName;
    const tableData = await getCollectionData(username, tableName);
    res.json(tableData);
});

app.post('/create-collection-from-template', createCollectionFromTemplate, function(req, res) {
    res.render('/pages/home')
})

app.use((err, req, res, next) => {
    console.error(err.stack);
    const errorMessage = 'Something went wrong!<br>Check if the page is set to EJS!<br><br>' + err.stack.replace(/\n/g, '<br>');
    res.status(500).send(errorMessage);
});

// Start the server
app.listen(port, () => {
    console.log(`Server Started on port ${port}...`);
});
