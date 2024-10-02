const http = require("http");
const express = require("express");
const session = require('express-session');
const mysql = require("mysql2");
const dotenv = require("dotenv");
const path = require("path");
dotenv.config({ path: path.resolve(__dirname, '.env') });

const bcrypt = require("bcryptjs");

const port = process.env.PORT;
const app = express();

const loginHandler = require('./server/authentication/loginHandler');
const signUpHandler = require('./server/authentication/signUpHandler');

const routeLoader = require('./utils/routeLoader');

const routes = await routeLoader('./routes/**/**/*.js');
app.use('/', routes);

app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use("/page", express.static(__dirname + "/pages/pages"));
app.use("/css", express.static(__dirname + "/public/css"));
app.use("/js", express.static(__dirname + "/public/js"));
app.use("/img", express.static(__dirname + "/public/assets/img"));


app.set('view engine', 'ejs');

const server = http.createServer(app);


app.get("/", async function(req, res) {
    res.render("index.ejs");
});



app.post('/login', loginHandler, (req, res) => {
    if (req.session.username) {
        res.redirect('/home');
    } else {
        res.redirect('/login');
    }
});



app.post('/signup', signUpHandler, function(req, res) {
    res.render('/pages/home')
})

app.get('/settings', (req, res) => {
    res.render('pages/account-settings');
});

app.post('/create-collection', createCollection, function(req, res) {
});

app.post('/add-collection-entry', addCollectionEntry, function(req, res) {
});

app.post('/create-collection-from-template', createCollectionFromTemplate, function(req, res) {
    res.redirect('/pages/home');
});

app.get('/collection-data/:collectionName', getCollectionData);


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

app.listen(port, () => {
    console.log(`Server Started on port ${port}...`);
});
