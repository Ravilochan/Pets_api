const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const PORT = 9000
const app = express()
const { dogsData, catsData } = require("./data")

app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(cors())
app.use(morgan('dev'))
app.use("/api/images", express.static('public'))

app.get("/api/v1/dogs", (req, res) => {
    res.json(dogsData)
})

app.get("/api/v1/cats", (req, res) => {
    res.json(catsData)
})

app.get("/api/v1/all", (req, res) => {
    res.json([...dogsData, ...catsData])
})

app.all("*", (req, res) => {
    res.status(404).json({ message: "API Endpoint Not Found" });
});

app.listen(PORT, () => {
    console.log(`Server API listening at http://localhost:${PORT}`);
});
