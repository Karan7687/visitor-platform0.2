# WiFi Network Connection Issues

## Problem
When connecting to a different WiFi network, the mobile app cannot login/register users or visitors because the API calls fail.

## Root Cause
The mobile app had hardcoded IP addresses that only worked on the original WiFi network. When you switch WiFi networks, your laptop gets a new IP address, but the app still tries to connect to the old IP.

## Solution Implemented

### 1. Updated IP Addresses
- Old IP: `192.168.1.3`
- New IP: `192.168.68.173` (your current WiFi IP)

### 2. Centralized API Configuration
Created `VisitorApp/src/config/api.js` to manage all API endpoints in one place.

### 3. Updated All Screens
- LoginScreen.tsx
- RegistrationScreen.tsx  
- VisitorFormScreen.tsx

All now use the centralized API configuration.

## Future WiFi Network Changes

When you connect to a different WiFi network:

1. **Find your new IP address:**
   ```bash
   ipconfig
   ```
   Look for "IPv4 Address" under "Wireless LAN adapter Wi-Fi"

2. **Update the API configuration:**
   Open `VisitorApp/src/config/api.js` and update the `API_BASE_URL` line:
   ```javascript
   export const API_BASE_URL = 'http://YOUR_NEW_IP:3000';
   ```

3. **Or use the helper tool:**
   Run `update-api-ip.bat` for step-by-step guidance.

## Quick Test Commands

To verify the backend is accessible:

```bash
# Test health endpoint
curl http://YOUR_IP:3000/health

# Test ping endpoint  
curl http://YOUR_IP:3000/ping
```

## Backend Server Status

The backend should always be running on port 3000 and listening on all interfaces (0.0.0.0) to accept connections from other devices on the same WiFi network.

Check if it's running:
```bash
netstat -an | findstr :3000
```

You should see: `TCP    0.0.0.0:3000           0.0.0.0:0    LISTENING`

## Firewall Notes

- Windows Defender Firewall may block incoming connections
- The backend server binds to 0.0.0.0 which should work across networks
- If issues persist, check Windows Firewall settings for port 3000
