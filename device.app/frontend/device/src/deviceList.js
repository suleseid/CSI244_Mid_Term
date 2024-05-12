import { fetchAllDevices } from "./Data/deviceRepository.js";

document.addEventListener("DOMContentLoaded", function () {
    const tableBody = document
      .getElementById("devices-table")
      .getElementsByTagName("tbody")[0];
  
    fetchAllDevices()
      .then((devices) => {
        devices.forEach((device) => {
          let row = tableBody.insertRow();
          row.innerHTML = `
                  <td>${device.id}</td>
                  <td>${device.title}</td>
                  <td>${device.description}</td>
                  <td>${device.manufactureyear}</td>
                  <td>${device.location}</td>
                  <td>${device.capacity}</td>
                  <td>
                      <a href="deviceDetails.html?id=${device.id}">Details</a> |
                      <a href="editDevice.html?id=${device.id}">Edit</a>
                  </td>
              `;
        });
      })
      .catch((error) => {
        console.error("Failed to fetch devices:", error);
        tableBody.innerHTML = `<tr><td colspan="7">Error loading devices. Please try again later.</td></tr>`;
      });
  });