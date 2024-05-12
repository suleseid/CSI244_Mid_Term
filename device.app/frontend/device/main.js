// import { fetchAllDevices } from "./src/Data/deviceRepository.js";

// // Simple function to show initial data or set up components
// function initializeApp() {
//   fetchAllDevices()
//     .then((devices) => {
//       const app = document.querySelector("#app");
//       const deviceList = devices
//         .map((device) => {
//           // Check if the device has a name property
//           if (device.name) {
//             return `<li>${device.name}</li>`;
//           } else {
//             // Handle the case where the name is undefined
//             console.warn('Device name is undefined:', device);
//             return `<li>Unnamed Device</li>`; // Placeholder for devices without a name
//           }
//         })
//         .join("");
//       app.innerHTML += `<ul>${deviceList}</ul>`;
//     })
//     .catch((error) => {
//       console.error("Failed to fetch devices:", error);
//     });
// }

// initializeApp();

