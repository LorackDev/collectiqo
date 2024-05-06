const http = require("http");
const express = require("express");
const mysql = require("mysql2");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const path = require("path");
const port = process.env.PORT || 8000;
const app = express();

// Load environment variables from .env file
dotenv.config({ path: './.env' });

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use("/page", express.static(__dirname + "views/pages"));
app.use("/css", express.static(__dirname + "public/css"));
app.use("/js", express.static(__dirname + "public/js"));
app.use("/img", express.static(__dirname + "public/assets/img"));

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

// Route for Sign-Up
app.get('/signup', (req, res) => {
    res.render('views/pages/signup');
});

// Route for Sign-Up
app.get('/home', (req, res) => {
    res.render('views/pages/home-user');
});

app.get('/test', (req, res) => {
    res.render('pages/test.ejs');
});

// Route to create user
app.post("/createUser", async (req, res) => {
    const user = req.body.name;
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    db.getConnection((err, connection) => {
        if (err) {
            throw err;
        }
        const sqlSearch = "SELECT * FROM userTable WHERE user = ?";
        const search_query = mysql.format(sqlSearch, [user]);
        const sqlInsert = "INSERT INTO userTable VALUES (0, ?, ?)";
        const insert_query = mysql.format(sqlInsert, [user, hashedPassword]);
        connection.query(search_query, async (err, result) => {
            if (err) {
                connection.release();
                throw err;
            }
            if (result.length !== 0) {
                connection.release();
                console.log("User already exists");
                res.sendStatus(409);
            } else {
                connection.query(insert_query, (err, result) => {
                    connection.release();
                    if (err) {
                        throw err;
                    }
                    console.log("Created new User");
                    console.log(result.insertId);
                    res.sendStatus(201);
                });
            }
        });
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server Started on port ${port}...`);
});
