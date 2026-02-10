// Test localhost backend
const API_BASE_URL = 'http://localhost:3000';

async function testLocalhost() {
  console.log('=== Testing Localhost Backend ===');
  
  try {
    const healthResponse = await fetch(`${API_BASE_URL}/health`);
    console.log('Health Status:', healthResponse.status, healthResponse.ok);
    const healthData = await healthResponse.json();
    console.log('Health Data:', healthData);
  } catch (error) {
    console.error('Health Error:', error);
  }
  
  try {
    const loginData = {
      email: 'test@example.com',
      password: 'password123'
    };
    
    const loginResponse = await fetch(`${API_BASE_URL}/api/users/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(loginData)
    });
    
    console.log('Login Status:', loginResponse.status, loginResponse.ok);
    const loginResult = await loginResponse.json();
    console.log('Login Result:', loginResult);
    console.log('Has token:', !!loginResult.token);
    
  } catch (error) {
    console.error('Login Error:', error);
  }
}

testLocalhost();
