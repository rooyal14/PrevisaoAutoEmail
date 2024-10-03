const fs = require('fs');
const path = require('path');

// Function to update the .env file
function updateEnv(key, value, envFilePath) {
    // Read the current .env file
    let envData = fs.readFileSync(envFilePath, 'utf8');
  
    // Check if the key exists, and update its value, or add the key-value pair
    const regex = new RegExp(`^${key}=.*`, 'm'); // Regular expression to find the key
    if (regex.test(envData)) {
        // If the key exists, replace its value
        envData = envData.replace(regex, `${key}=${value}`);
    } else {
        // If the key doesn't exist, add it at the end
        envData += `\n${key}=${value}`;
    }
  
    // Write the updated content back to the .env file
    fs.writeFileSync(envFilePath, envData, 'utf8');
  }