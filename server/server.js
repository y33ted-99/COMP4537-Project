const express = require('express');
const bodyParser = require('body-parser');
const { spawn } = require('child_process');
const mongoose = require("mongoose");
const path = require('path');

const authRouter = require("./auth/authRouter"); 
const apiRouterV1 = require("./api/v1"); 

const app = express();
app.use(bodyParser.json());

app.use("/auth", authRouter);
app.use("/api/v1", apiRouterV1);


const PORT = process.env.PORT || 5500;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});