const express = require("express");
const session = require('express-session');
const dotenv = require("dotenv");
const path = require("path");
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const port = process.env.PORT;
const app = express();

const routeLoader = require('./utils/routeLoader');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + "/public"));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // Set the correct views directory

app.use(session({
    secret: 'my-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}));

app.get("/", async function(req, res) {
    res.render("index.ejs");
});



routeLoader(app);

app.listen(port, () => {
    console.log(`Server Started on port ${port}...`);
});
