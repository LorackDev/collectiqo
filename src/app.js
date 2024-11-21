const express = require("express");
const https = require("https");
const fs = require("fs");
const session = require('express-session');
const dotenv = require("dotenv");
const path = require("path");
const os = require("os");
dotenv.config({ path: path.resolve(__dirname, '../.env') });
const MongoStore = require('connect-mongo');
const cors = require('cors');


const port = process.env.PORT;
const app = express();

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
app.use(express.static(path.join(__dirname, "public")));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // Set the correct views directory

app.use(session({
    secret: 'my-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, sameSite: 'lax' },
    store: MongoStore.create({ mongoUrl: 'mongodb://localhost:27017/sessions'})
}));

app.use(cors({
    origin: 'https://dev.collectiqo.com:3000', // Replace with your frontend URL
    credentials: true,
    methods: ['GET', 'POST'],
    optionsSuccessStatus: 204
}));

app.get("/", async function(req, res) {
    res.render("index.ejs");
});



routeLoader(app);

https.createServer(options, app).listen(3000, () => {
    console.log('App running on https://dev.collectiqo.com:3000');
});