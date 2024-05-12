const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();
const PORT = 3001;

// function to load device data from JSON file
function loadDevices() {
  return JSON.parse(fs.readFileSync("./devices.json", "utf8"));
}

// function that saves device data to JSON file
function saveDevices(devices) {
  fs.writeFileSync("./devices.json", JSON.stringify(devices, null, 4), "utf8");
}

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors()); // Enable CORS

// Get all devices
app.get("/devices", (req, res) => {
  const devices = loadDevices();
  res.json(devices);
});

// Get a single device by ID
app.get("/devices/:id", (req, res) => {
  const devices = loadDevices();
  //get requests pass data in req.params
  const device = devices.find((d) => d.id === parseInt(req.params.id));
  if (device) {
    res.json(device);
  } else {
    res.status(404).send("Device not found");
  }
});
// Create a new device
app.post("/devices", (req, res) => {
  const devices = loadDevices();
  //post requests pass data in req.body
  const device = req.body;
  console.log("Received device:", device);
  //Assign a unique ID to the device (This is usually handled by the database)
  device.id = devices.length + 1;
  devices.push(device);
  saveDevices(devices);
  //201 status code is used to indicate that a new resource has been created.
  res.status(201).send(device);
});
// Update an existing device
app.put("/devices/:id", (req, res) => {
  let devices = loadDevices();
  //put requests passes the id in params and the data in body
  //find the index of the device we want to update
  const index = devices.findIndex((d) => d.id === parseInt(req.params.id));
  //if the device is found, update the device with the new data
  if (index !== -1) {
    //update the device at index with the data from the request body
    devices[index] = { ...devices[index], ...req.body };
    saveDevices(devices);
    res.send(devices[index]);
  } else {
    res.status(404).send("Device not found");
  }
});

// Delete a device
app.delete("/devices/:id", (req, res) => {
  let devices = loadDevices();
  //the filter method creates a new array with all elements that match the condition
  //create a new array of all device except the one with the id passed in the request
  const filteredDevices = devices.filter(
    (device) => device.id !== parseInt(req.params.id)
  );
  //if the lengths do not match, it means a student was deleted
  if (devices.length !== filteredDevices.length) {
    saveDevices(filteredDevices);
    res.status(200).send({ message: "Device deleted successfully" });
  } else {
    res.status(404).send("Device not found");
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
