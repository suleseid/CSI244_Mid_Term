import { fetchDeviceById } from "./Data/deviceRepository.js";

function getDeviceIdFromUrl(){
    const queryParams =new URLSearchParams(window.location.search);
    return queryParams.get("id");
}

document.addEventListener("DOMContentLoaded", ()=> {
    const deviceId =getDeviceIdFromUrl();
    if (deviceId) {
     fetchDeviceById(deviceId)
     .then((device)=>{
         document.getElementById("device-id").textContent =device.id;
         document.getElementById("device-title").textContent =device.title;
         document.getElementById("device-description").textContent =device.description;
         document.getElementById("device-manufactureyear").textContent =device.manufactureyear;
         document.getElementById("device-location").textContent =device.location;
         document.getElementById("device-capacity").textContent =device.capacity;
     })
     .catch((error)=>{
         console.error("Failed to fetch device details:", error);
         document.getElementById("app").innerHTML =
           "Failed to load device details.";
     });
    }
    else
    {
     console.error("No device ID provided in the URL.");
    }
 
 });