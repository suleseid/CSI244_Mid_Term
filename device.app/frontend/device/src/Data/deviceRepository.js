const API_BASE_URL ="http://localhost:3001";

function handleResponse(response){
    if (!response.ok) {
        throw new Error (`HTTP error! Status: ${response.status}`);  
    }
    return response.json();
}

// Fetch all devices and sort them by Id
function fetchAllDevices() {
    return fetch(`${API_BASE_URL}/devices`)
      .then(handleResponse)
      .then(devices => devices.sort((a, b) => a.id - b.id)) //Sort devices by ID
      .catch((error) => {
        console.error("Error fetching all devices:", error);
        throw error; // This allow to call or display error message
      });
  }
  
// Fetch a single device by Id
function fetchDeviceById(deviceId) {
    return fetch(`${API_BASE_URL}/devices/${deviceId}`)
      .then(handleResponse)
      .catch((error) => {
        console.error("Error fetching device by ID:", error);
        throw error; // Re-throw to allow caller to handle or display error message
      });
  }
  
  // Create a new device
  function createDevice(deviceData) {
    return fetch(`${API_BASE_URL}/devices`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(deviceData),
    })
      .then(handleResponse)
      .catch((error) => {
        console.error("Error creating new book:", error);
        throw error; // This allow to call or display error message
      });
  }
  
  // Update an existing device
  function updateDevice(deviceId, deviceData) {
      return fetch(`${API_BASE_URL}/devices/${deviceId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(deviceData),
      })
        .then(handleResponse)
        .catch((error) => {
          console.error("Error updating device:", error);
          throw error; // Re-throw to allow caller to handle or display error message
        });
    }
  
  // Delete a device by ID
  function deleteDevice(deviceId) {
      return fetch(`${API_BASE_URL}/devices/${deviceId}`, {
        method: "DELETE",
      })
        .then(handleResponse)
        .catch((error) => {
          console.error("Error deleting device:", error);
          throw error; // Re-throw to allow caller to handle or display error message
        });
    }
  
  
  export { fetchAllDevices, fetchDeviceById, createDevice, updateDevice, deleteDevice };
  