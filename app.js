const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require('cookie-parser');

dotenv.config({ path: require("path").resolve(__dirname, ".env") });

const app = express();

app.use(cors());
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(cookieParser());

app.use(express.static(`${__dirname}/public`));

// auth middleware function
function authMiddleware(req, res, next) {
    const token = req.cookies && req.cookies.auth_token;
    if (!token || !validateToken(token)) {
        return res.redirect('/login');
    }
    next();
}

app.get("/login", (_, res) => {
    res.sendFile("public/login.html", {root: __dirname});
});

app.get("/register", (_, res) => {
    res.sendFile("public/register.html", {root: __dirname});
});

app.get("/user", authMiddleware, (_, res) => {
    res.sendFile("public/user.html", {root: __dirname});
});

app.listen("8080", () => {
    console.log("Listening on Port 8080");
});
