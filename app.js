const http = require("http");
const express = require("express");
const session = require('express-session');
const mysql = require("mysql2");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
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
const getCollectionNames = require('./server/collections/getCollectionNames');
const getCollectionData = require('./server/collections/getCollectionData');

// Middleware to parse JSON bodies
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));
app.use(express.urlencoded({ extended: true })); // Added middleware to parse URL-encoded bodies
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

// Route for user's home page to show username and collection names
app.get('/home', async (req, res) => {
    if (!req.session.username) {
        return res.redirect('/login');
    }
    try {
        const collectionNames = await getCollectionNames(req.session.username);
        res.render('pages/home', { username: req.session.username, collections: collectionNames });
    } catch (err) {
        console.error(err);
        res.render('pages/home', { username: req.session.username, collections: [] });
    }
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
    res.redirect('/pages/home');
})

app.get('/collections/:index', async (req, res) => {
    const username = req.session.username;
    const index = req.params.index;

    try {
        const collectionNames = await getCollectionNames(username); // Assuming you have a function to get collection names
        const collectionName = collectionNames[index]; // Get the collection name based on index

        if (!collectionName) {
            return res.status(404).send('Collection not found');
        }

        const collectionData = await getCollectionData(collectionName, username); // Fetch collection data

        // Render the collection.ejs template with username and collection data
        res.render('collection', {
            username: username,
            collectionName: collectionName,
            collectionData: collectionData
        });
    } catch (error) {
        console.error(`Error fetching collection data: ${error}`);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/delete-collection', async (req, res) => {
    try {
        await deleteCollection(req, res);
        res.status(200).send({ success: true });
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
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
