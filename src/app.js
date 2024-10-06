const http = require("http");
const express = require("express");
const session = require('express-session');
const dotenv = require("dotenv");
const path = require("path");
dotenv.config({ path: path.resolve(__dirname, '.env') });

const port = process.env.PORT;
const app = express();

const routeLoader = require('./utils/routeLoader');

async function initializeApp() {
    const routes = await routeLoader('./**/**/routes/*.js');
    app.use(routes);

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

    app.listen(port, () => {
        console.log(`Server Started on port ${port}...`);
    });
}

initializeApp().catch(err => {
    console.error("Failed to initialize the app:", err);
});