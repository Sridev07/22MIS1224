const express = require("express");

const logger = require("./logger");

const app = express();

app.use(logger);

app.get("/", (req, res) => {

    res.send("Logging Middleware Working");

});

app.listen(4000, () => {

    console.log(
        "Logging middleware server running on port 4000"
    );

});