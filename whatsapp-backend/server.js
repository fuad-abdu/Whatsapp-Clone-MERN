// importing
import express from "express";
import mongoose from "mongoose";
import Pusher from "Pusher";
import cors from "cors";

// app config
const app = express();
const port = process.env.PORT || 9000;

const pusher = new Pusher({
  appId: "1267636",
  key: "12852351f22566cbb74b",
  secret: "04789fa1e184fde00ff2",
  cluster: "eu",
  useTLS: true,
});

//middleware
app.use(express.json());
app.use(cors());

// DB config
const Connection_URL =
  "mongodb+srv://admin:4XocnrDUNymoHMKH@cluster0.nhweu.mongodb.net/whatsappDB?retryWrites=true&w=majority";

mongoose.connect(Connection_URL);

const db = mongoose.connection;

db.once("open", () => {
  console.log("DB connected");

  const msgCollection = db.collection("messagecontents");
  const roomCollection = db.collection("rooms")
  
  const changeMsgStream = msgCollection.watch();
  const changeRoomStream = roomCollection.watch();

  changeMsgStream.on("change", (change) => {
    // console.log(change);
    if (change.operationType === "insert") {
      const messageDetails = change.fullDocument;
      pusher.trigger("message", "inserted", {
        roomId: messageDetails.roomId,
        name: messageDetails.name,
        message: messageDetails.message,
        timestamp: messageDetails.timestamp
        // received: messageDetails.received
      });
    } else {
      console.log("err triggering Msg pusher");
    }
  });

  changeRoomStream.on("change", (change) => {
    // console.log(change);
    if (change.operationType === "insert") {
      const room = change.fullDocument;
      pusher.trigger("room", "RoomInserted", {
        name: room.name
      });
    } else {
      console.log("err triggering room pusher");
    }
  });
});

// DB Messages

const whatsappSchema = mongoose.Schema({
  roomId: String,
  message: String,
  name: String,
  timestamp: Date
  // received: Boolean,
});


const whatsappRoomsSchema = mongoose.Schema({
  name: String
});

const Messages = mongoose.model("messagecontents", whatsappSchema);
const Rooms = mongoose.model("rooms", whatsappRoomsSchema);

// api routes
app.get("/", (req, res) => res.status(200).send("Helo World. my name is fuad"));

app.get("/messages/sync/:roomId", (req, res) => {
  const roomId = req.params.roomId;
  Messages.find({"roomId": roomId},(err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

app.get("/messages/sync/", (req, res) => {
  Messages.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

app.get("/rooms/sync", (req, res) => {
  Rooms.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

app.post("/rooms/new", (req, res) => {
  const roomDetails = req.body;

  Rooms.create(roomDetails, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
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
