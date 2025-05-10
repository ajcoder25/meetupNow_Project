const connectionDB = require("./config/db");
const dotenv = require("dotenv");
const express = require("express");
const app = express();
app.use(express.json());
dotenv.config();
const cors = require("cors");
app.use(cors());

connectionDB();

const EventModel = require("./models/event.model");

app.post("/v1/events", async (req, res) => {
  try {
    const saveNew = new EventModel(req.body);
    await saveNew.save();
    res.status(201).json({ message: "Sucessfully Saved", savedData: saveNew });
  } catch (error) {
    console.log("Error saving the data", error.message);
    res.status(400).json({ error: "Unable to save the data" });
  }
});

// get all the data

const getData = async () => {
  try {
    const findData = await EventModel.find();

    return findData;
  } catch (error) {
    console.log(error.message);
  }
};

app.get("/v1/events", async (req, res) => {
  try {
    const checkData = await getData();
    if (checkData.length !== 0) {
      res.send(checkData);
    } else {
      res.status(400).json({ error: "Unable to find any data" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(401).json({ error: "unable to fetch the data" });
  }
});

// delete it

const deleteEvent = async (eventId) => {
  try {
    const findbyId = await EventModel.findByIdAndDelete(eventId);

    return findbyId;
  } catch (error) {
    console.log("something is wrong ", error.message);
  }
};

app.delete("/v1/events/:eventid", async (req, res) => {
  try {
    const checkEventIdDelete = await deleteEvent(req.params.eventid);
    if (checkEventIdDelete) {
      res.status(200).json({
        message: "Sucessfully Deleted",
        deletedObj: checkEventIdDelete,
      });
    }
  } catch (error) {
    res.status(400).json({ error: "Something is wrong in API" });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Sucessfully connencted to ${PORT}`);
});
