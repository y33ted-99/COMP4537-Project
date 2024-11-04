const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");

const authRouter = require("./auth/authRouter"); 
const apiRouterV1 = require("./api/v1"); 

const server = express();
server.use(cors());
server.use(express.json());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true })); 

server.use("/auth", authRouter);
server.use("/api/v1", apiRouterV1);


const PORT = process.env.PORT || 5500;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
