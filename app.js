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
const getCollectionData = require('./server/collections/getCollectionData');

// Middleware to parse JSON bodies
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

app.post('/login', loginHandler, function(req, res) {
    req.session.username = req.body.username;
    res.redirect('pages/login')
})

// Route for Sign-Up
app.get('/signup', (req, res) => {
    res.render('pages/signup');
});

app.post('/signup', signUpHandler, function(req, res) {
    res.render('/pages/home')
})

// Route for Sign-Up
app.get('/home', (req, res) => {
    res.render('pages/home');
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

app.use((err, req, res, next) => {
    console.error(err.stack);
    const errorMessage = 'Something went wrong!<br>Check if the page is set to EJS!<br><br>' + err.stack.replace(/\n/g, '<br>');
    res.status(500).send(errorMessage);
});

// Start the server
app.listen(port, () => {
    console.log(`Server Started on port ${port}...`);
});
