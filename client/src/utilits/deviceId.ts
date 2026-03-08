// // utils/deviceId.ts
// import { v4 as uuidv4 } from "uuid";

// export function getDeviceId(): string {
//   // Check if device ID already exists
//   let deviceId = localStorage.getItem("device_id");

//   // If not, generate and store it
//   if (!deviceId) {
//     deviceId = uuidv4(); // only runs once per device
//     localStorage.setItem("device_id", deviceId);
//   }

//   // Always return the same one for this device
//   return deviceId;
// }
