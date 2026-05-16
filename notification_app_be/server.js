const express = require("express");
const cors = require("cors");

const getAuthToken = require("./services/authService");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {

    const token = await getAuthToken();

    res.json({
        token
    });

});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});