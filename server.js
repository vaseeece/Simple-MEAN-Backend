const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const config = require("./config.json");
const port = process.env.PORT || 4400;
const url = `mongodb+srv://${config.mongodb.userName}:${config.mongodb.password}@${config.mongodb.clusterDetails}/${config.mongodb.dbName}?retryWrites=true&w=majority`;

const app = express();
app.use(cors());

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
const con = mongoose.connection;

con.on("open", () => {
  console.log("DB connected...");
});

app.use(express.json());

const participantsRouter = require("./routes/participants");
app.use("/participants", participantsRouter);

app.listen(port, () => {
  console.log(`server started and listening to port ${port}...`);
});
