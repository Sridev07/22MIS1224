const axios = require("axios");

async function getAuthToken() {
    try {

        const response = await axios.post(
            "http://4.224.186.213/evaluation-service/auth",
            {
                email: "sridevprasaath7777@gmail.com",
                name: "Sridev prasaath L",
                rollNo: "22MIS1224",
                accessCode: "SfFuWg",
                clientID: "d8706d28-672d-4c72-81d7-4438d768db2f",
                clientSecret: "tnZBJZyRwkKsuBtA"
            }
        );

        console.log(response.data);

        return response.data.access_token;

    } catch (error) {

        console.log(error.response?.data || error.message);

    }
}

module.exports = getAuthToken;