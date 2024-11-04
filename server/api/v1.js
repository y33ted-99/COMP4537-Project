const express = require("express");
const dotenv = require("dotenv");
const { spawn } = require('child_process');
const jwt = require("jsonwebtoken");


dotenv.config({ path: require("path").resolve(__dirname, ".env") });

const router = express.Router();

router.post('/summarize', (req, res) => {
    const token = req.body.token;

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, _) => {
        if (err) {
            return res.status(401).send("Unauthorized");
        }
        return res.status(200).send("authorized");
    });
    

    // get the text from the request
    const text = req.body.text;

    // spawn the python script
    const pythonProcess = spawn('python', ["summarize.py"]);

    // send the JSON input to the python process
    pythonProcess.stdin.write(JSON.stringify({ text }));
    // end the input stream
    pythonProcess.stdin.end();

    // variable to hold the output from the python script
    let data = "";

    // get the output from the python script and append to data
    pythonProcess.stdout.on('data', (chunk) => {
        data += chunk.toString();
    });

    // handle the end of the process
    pythonProcess.stdout.on('end', () => {
        // try to send the response to client
        try {
            const result = JSON.parse(data);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error: "Failed to process the summary" });
        }
    });

    // handle errors
    pythonProcess.stderr.on('data', (error) => {
        console.error(`Error from Python script: ${error}`);
        res.status(500).json({ error: "An error occurred in Python processing" });
    });

});

module.exports = router;
