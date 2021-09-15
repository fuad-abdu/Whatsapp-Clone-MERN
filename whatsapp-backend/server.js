// importing
import express from "express";
import mongoose from "mongoose";

// app config
const app = express();
const port = process.env.PORT || 9000;

//middleware
app.use(express.json());

// DB config
const Connection_URL =
  "mongodb+srv://admin:4XocnrDUNymoHMKH@cluster0.nhweu.mongodb.net/whatsappDB?retryWrites=true&w=majority";

mongoose.connect(Connection_URL);

// DB Messages

const whatsappSchema = mongoose.Schema({
  message: String,
  name: String,
  timestamp: String,
  received: Boolean,
});

const Messages = mongoose.model("messageContent", whatsappSchema);

// api routes
app.get("/", (req, res) => res.status(200).send("Helo World. my name is fuad"));

app.get("/messages/sync", (req, res) => {
  Messages.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

app.post("/messages/new", (req, res) => {
  const dbMessage = req.body;

  Messages.create(dbMessage, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

// listen
app.listen(port, () => console.log(`Listen on localhost: ${port}`));
