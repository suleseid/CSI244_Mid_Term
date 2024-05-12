import { deleteDevice } from "./Data/deviceRepository.js";

document.getElementById("delete-device-form")
        .addEventListener("submit", function (event) {
           event.preventDefault(); // Prevent the form from submitting the traditional way
  
   const deviceId = document.getElementById("id").value; // Get the Id from the form
   deleteDevice(deviceId)
    .then(() => {
      alert("Device deleted successfully!");
      window.location.href = "deviceList.html"; // Redirect to the device list
    })
    .catch((error) => {
      console.error("Error deleting device:", error);
      alert("Failed to delete device. Please try again.");
    });
});