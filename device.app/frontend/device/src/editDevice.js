import { fetchDeviceById, updateDevice } from "./Data/deviceRepository.js";

function getDeviceIdFromUrl(){
    const queryParams = new URLSearchParams(window.location.search);
    return queryParams.get("id");
 }
 
  document.addEventListener("DOMContentLoaded", () => {
   const deviceId = getDeviceIdFromUrl();
    if (deviceId) {
     fetchDeviceById(deviceId)
       .then((device) => {
        document.getElementById("id").value = device.id;
        document.getElementById("title").value = device.title;
        document.getElementById("description").value = device.description;
        document.getElementById("manufactureyear").value = device.manufacture_year;
        document.getElementById("location").value = device.location;
        document.getElementById("capacity").value = device.capacity;
      })
       .catch((error) => {
         alert("Failed to load device data.");
       });
 
       document.getElementById("edit-device-form")
       .addEventListener("submit", function (event) {
        event.preventDefault();
        const updatedDeviceData = {
          id: parseInt(document.getElementById("id").value, 10),
          model: document.getElementById("title").value,
          manufacturer: document.getElementById("description").value,
          manufactureyear: parseInt(document.getElementById("manufactureyear").value, 10),
          type: document.getElementById("location").value,
          capacity: document.getElementById("capacity").value,
        };
  
        console.log('Updating device with ID:', deviceId);
        console.log('Updated data:', updatedDeviceData);

        updateDevice(deviceId, updatedDeviceData)
          .then(() => {
            alert("Device updated successfully!");
            window.location.href = "DeviceList.html"; // Redirect to the device list
          })
          .catch((error) => {
            console.error("Error updating device:", error);
            alert("Failed to update device. Please try again.");
          });
      });
  } else {
    console.error("No device ID provided in the URL for editing. Please select a device to edit.");
    window.location.href = "deviceList.html"; // Redirect to the device list page
  }
});