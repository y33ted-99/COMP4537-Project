const express = require("express");
const dotenv = require("dotenv");
const { spawn } = require("child_process");
const jwt = require("jsonwebtoken");

const ApiToken = require("../models/apiToken");
const { default: mongoose } = require("mongoose");

dotenv.config({ path: require("path").resolve(__dirname, ".env") });

const router = express.Router();

// token validation middleware function
async function tokenValidationMiddleware(req, res, next) {
  const token = req.body.token;

  try {
    const tokenValid = await ApiToken.findOne({ token: token });

    if (!tokenValid) {
      res.status(400).json({ message: "Invalid Token" });
      return;
    }
  } catch (err) {
    res
      .status(400)
      .json({ message: "An error occured when validating the Token" });
    return;
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, _) => {
    if (err) {
      return res.status(401).json({ message: "Invalid Token" });
    }
    next();
  });
}

router.post("/summarize", tokenValidationMiddleware, (req, res) => {
  // get the text from the request
  const text = req.body.text;

  //   res.status(200).json({ text: text });

  // spawn the python script
  const pythonProcess = spawn("python", ["summarize.py"]);

  // send the JSON input to the python process
  pythonProcess.stdin.write(JSON.stringify({ text }));
  // end the input stream
  pythonProcess.stdin.end();

  // variable to hold the output from the python script
  let data = "";

  // get the output from the python script and append to data
  pythonProcess.stdout.on("data", (chunk) => {
    data += chunk.toString();
  });

  // handle the end of the process
  pythonProcess.stdout.on("end", () => {
    // try to send the response to client
    try {
      const result = JSON.parse(data);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: "Failed to process the summary" });
    }
  });

  // handle errors
  pythonProcess.stderr.on("data", (error) => {
    console.error(`Error from Python script: ${error}`);
    res.status(500).json({ error: "An error occurred in Python processing" });
  });
});

module.exports = router;
