const express = require("express");

const pois = require("./Tehtava4_1");

const app = express();

const port = 3000;
const baseURL = "/api/v1";

app.use(express.json());

app.use(baseURL + "/pois", pois);

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});