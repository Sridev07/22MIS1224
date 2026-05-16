const axios = require("axios");
const fs = require("fs");

const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJzcmlkZXZwcmFzYWF0aDc3NzdAZ21haWwuY29tIiwiZXhwIjoxNzc4OTMzNDIyLCJpYXQiOjE3Nzg5MzI1MjIsImlzcyI6IkFmZm9yZCBNZWRpY2FsIFRlY2hub2xvZ2llcyBQcml2YXRlIExpbWl0ZWQiLCJqdGkiOiJlN2Q5ZjNmMy00Yzk4LTRhYjAtOWVhOC05N2QwNTJiZmMwNjYiLCJsb2NhbGUiOiJlbi1JTiIsIm5hbWUiOiJzcmlkZXYgcHJhc2FhdGggbCIsInN1YiI6ImQ4NzA2ZDI4LTY3MmQtNGM3Mi04MWQ3LTQ0MzhkNzY4ZGIyZiJ9LCJlbWFpbCI6InNyaWRldnByYXNhYXRoNzc3N0BnbWFpbC5jb20iLCJuYW1lIjoic3JpZGV2IHByYXNhYXRoIGwiLCJyb2xsTm8iOiIyMm1pczEyMjQiLCJhY2Nlc3NDb2RlIjoiU2ZGdVdnIiwiY2xpZW50SUQiOiJkODcwNmQyOC02NzJkLTRjNzItODFkNy00NDM4ZDc2OGRiMmYiLCJjbGllbnRTZWNyZXQiOiJ0blpCSlp5UndrS3N1QnRBIn0.nNPX0osTVGF7EVPmXD-2Dr6RIoYpTxO7opK5qRDOPRw"
async function fetchData() {

    try {

        const depotsResponse = await axios.get(
            "http://4.224.186.213/evaluation-service/depots",
            {
                headers: {
                    Authorization: `Bearer ${TOKEN}`
                }
            }
        );

        const vehiclesResponse = await axios.get(
            "http://4.224.186.213/evaluation-service/vehicles",
            {
                headers: {
                    Authorization: `Bearer ${TOKEN}`
                }
            }
        );

        const depots = depotsResponse.data.depots;
        const vehicles = vehiclesResponse.data.vehicles;

        console.log("Depots:", depots);
        console.log("Vehicles:", vehicles);

        let result = [];

        depots.forEach((depot) => {

            let remainingHours = depot.MechanicHours;

            let selectedTasks = [];

            let sortedVehicles = [...vehicles].sort(
                (a, b) =>
                    (b.Impact / b.Duration) -
                    (a.Impact / a.Duration)
            );

            sortedVehicles.forEach((vehicle) => {

                if (vehicle.Duration <= remainingHours) {

                    selectedTasks.push(vehicle);

                    remainingHours -= vehicle.Duration;

                }

            });

            result.push({
                DepotID: depot.ID,
                TotalHours: depot.MechanicHours,
                RemainingHours: remainingHours,
                SelectedTasks: selectedTasks
            });

        });

        fs.writeFileSync(
            "result.json",
            JSON.stringify(result, null, 2)
        );

        console.log("Scheduling completed.");

    } catch (error) {

        console.log(
            error.response?.data || error.message
        );

    }

}

fetchData();