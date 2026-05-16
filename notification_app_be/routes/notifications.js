const express = require("express");
const axios = require("axios");

const router = express.Router();

const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJzcmlkZXZwcmFzYWF0aDc3NzdAZ21haWwuY29tIiwiZXhwIjoxNzc4OTI5MzY4LCJpYXQiOjE3Nzg5Mjg0NjgsImlzcyI6IkFmZm9yZCBNZWRpY2FsIFRlY2hub2xvZ2llcyBQcml2YXRlIExpbWl0ZWQiLCJqdGkiOiIxN2YxY2ViZS03MzExLTQxNjMtODg0My00ZWFlZDRmMGE5OWMiLCJsb2NhbGUiOiJlbi1JTiIsIm5hbWUiOiJzcmlkZXYgcHJhc2FhdGggbCIsInN1YiI6ImQ4NzA2ZDI4LTY3MmQtNGM3Mi04MWQ3LTQ0MzhkNzY4ZGIyZiJ9LCJlbWFpbCI6InNyaWRldnByYXNhYXRoNzc3N0BnbWFpbC5jb20iLCJuYW1lIjoic3JpZGV2IHByYXNhYXRoIGwiLCJyb2xsTm8iOiIyMm1pczEyMjQiLCJhY2Nlc3NDb2RlIjoiU2ZGdVdnIiwiY2xpZW50SUQiOiJkODcwNmQyOC02NzJkLTRjNzItODFkNy00NDM4ZDc2OGRiMmYiLCJjbGllbnRTZWNyZXQiOiJ0blpCSlp5UndrS3N1QnRBIn0.6d9IxQ5LyMfNb56G_EQSQEHQqclPwsPoyaKasrR9BkE";

router.get("/depots", async (req, res) => {

    try {

        const response = await axios.get(
            "http://4.224.186.213/evaluation-service/depots",
            {
                headers: {
                    Authorization: `Bearer ${TOKEN}`
                }
            }
        );

        res.json(response.data);

    } catch (error) {

        res.json(
            error.response?.data || error.message
        );

    }

});

router.get("/vehicles", async (req, res) => {

    try {

        const response = await axios.get(
            "http://4.224.186.213/evaluation-service/vehicles",
            {
                headers: {
                    Authorization: `Bearer ${TOKEN}`
                }
            }
        );

        res.json(response.data);

    } catch (error) {

        res.json(
            error.response?.data || error.message
        );

    }

});

module.exports = router;