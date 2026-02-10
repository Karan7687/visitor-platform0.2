// Test login with different credentials
const API_BASE_URL = 'https://visitor-platform.onrender.com';

async function testLoginCredentials() {
  console.log('=== Testing Login Credentials ===');
  
  const testCredentials = [
    { email: 'test@example.com', password: 'password123' },
    { email: 'admin@example.com', password: 'admin123' },
    { email: 'user@example.com', password: 'user123' }
  ];
  
  for (const creds of testCredentials) {
    try {
      console.log(`\nTesting login for: ${creds.email}`);
      
      const response = await fetch(`${API_BASE_URL}/api/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(creds)
      });
      
      console.log('Response status:', response.status, response.ok);
      const data = await response.json();
      console.log('Response data:', data);
      
      if (data.token) {
        console.log('✅ Token found:', data.token.substring(0, 20) + '...');
      } else {
        console.log('❌ No token in response');
      }
      
    } catch (error) {
      console.error(`Login failed for ${creds.email}:`, error);
    }
  }
}

testLoginCredentials();
