const http = require("http");
const express = require("express");
const mysql = require("mysql2");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const port = process.env.PORT || 8000;
const app = express();

// Load environment variables from .env file
dotenv.config({ path: './.env' });

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.static("public"));
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

// MySQL database connection
// const db = mysql.createConnection({
//     host: process.env.DATABASE_HOST,
//     port: process.env.DATABASE_PORT,
//     user: process.env.DATABASE_USER,
//     password: process.env.DATABASE_PASSWORD,
//     database: process.env.DATABASE
// });

// Connect to the database
// db.connect((error) => {
//     if(error) {
//         console.log(error)
//     } else {
//         console.log("MySQL connected!")
//     }
// })

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
