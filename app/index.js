var express = require("express")
var app = express()

const bodyParser = require("body-parser")
const login = require("./routes/login")
const additionaltask = require("./routes/additionaltasks")
const port = 3000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(login)
app.use(additionaltask)

app.use("/", (req, res, next) => {
    res.status(404)
    res.send("ERROR")
})
app.listen(port, () => {
    console.log("listening on port " + port)
})