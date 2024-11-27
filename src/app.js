const express = require("express");
const https = require("https");
const fs = require("fs");
const mongoose = require('mongoose')
const session = require('express-session');
const dotenv = require("dotenv");
const path = require("path");
const os = require("os");
dotenv.config({ path: path.resolve(__dirname, '../.env') });
const MongoStore = require('connect-mongo');
const cors = require('cors');


const port = process.env.PORT;
const app = express();

const mongoSessionUri = `mongodb://${process.env.MONGO_DATABASE_USER}:${process.env.MONGO_DATABASE_PASSWORD}@${process.env.MONGO_DATABASE_HOST}:${process.env.MONGO_DATABASE_PORT}/session_storage?authSource=admin`

const routeLoader = require('./utils/routeLoader');

function resolveHome(filepath) {
    if (filepath[0] === '~') {
        return path.join(os.homedir(), filepath.slice(1));
    }
    return filepath;
}

const options = {
    key: fs.readFileSync(resolveHome(process.env.SSL_KEY_PATH)),
    cert: fs.readFileSync(resolveHome(process.env.SSL_CERT_PATH))
}

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // Set the correct views directory

// config for session
app.use(session({
    secret: process.env.SESSION_KEY,
    httpOnly: true,
    secure: true,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: mongoSessionUri,
        collectionName: 'sessions'
    }),
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 //Equals 24 hours
    }
}));

// route for landing page (maybe we can separate this from app.js?)
app.get("/", async function(req, res) {
    res.render("index.ejs");
});

// loads all routes of the project
routeLoader(app);

// starts app with https protocol
https.createServer(options, app).listen(port, () => {
    console.log(`App running on https://dev.collectiqo.com:${port}`);
});