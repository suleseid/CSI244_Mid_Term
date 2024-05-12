import { createDevice, fetchAllDevices } from "./Data/deviceRepository.js";

// Define the insertDevice function
function insertDevice(newDevice, position) {
  fetchAllDevices()
    .then(devices => {
      // Increment the IDs of devices after the position
      devices.forEach(device => {
        if (device.id >= position) {
          device.id += 1;
        }
      });
      // Insert the new device at the desired position
      devices.splice(position - 1, 0, newDevice);
    })
    .catch(error => {
      console.error("Error inserting device:", error);
    });
}
// Event listener for form submission
document
  .getElementById("create-device-form")
  .addEventListener("submit", 
  function (event) {
    event.preventDefault();
    const deviceData = {
        id: parseInt(document.getElementById("id").value, 10),
        title: document.getElementById("title").value,
        description: document.getElementById("description").value,
        manufactureyear: parseInt(document.getElementById("manufactureyear").value, 10),
        location: document.getElementById("location").value,
        capacity: document.getElementById("capacity").value,
    };

    // Initialize positionToInsert with the position where we want to insert the new device
    // Replace '4' with the actual position number
    const positionToInsert = 4;/* position where we want to insert the new device */
    
    // Call the insertDevice function with the new device data and position
    insertDevice(deviceData, positionToInsert);

    //The createDevice function should only be called if we're not using insertDevice
    //If we're using insertDevice, 
    //we should have to comment out the createDevice call
    createDevice(deviceData)
    .then(() => {
      alert("Device created successfully!");
      return fetchAllDevices(); // Fetch and sort devices after creation
    })
    .then(sortedDevices => {
      // Here where we can update the devices with the sorted devices
      console.log(sortedDevices);
      window.location.href = "DeviceList.html"; // then we can redirect to the device list
    })
    .catch((error) => {
      console.error("Error creating device:", error);
      alert("Failed to create device. Please try again.");
    });
});