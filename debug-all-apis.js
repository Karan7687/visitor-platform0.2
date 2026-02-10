// Debug all APIs: Login, Registration, Visitor Registration
const API_BASE_URL = 'https://visitor-platform.onrender.com';

async function debugAPIs() {
  console.log('=== DEBUGGING ALL APIS ===');
  
  // Test 1: Health Check
  console.log('\n1. Testing Health Check...');
  try {
    const healthResponse = await fetch(`${API_BASE_URL}/health`);
    console.log('Health Status:', healthResponse.status, healthResponse.ok);
    const healthData = await healthResponse.json();
    console.log('Health Data:', healthData);
  } catch (error) {
    console.error('Health Error:', error);
  }
  
  // Test 2: User Registration
  console.log('\n2. Testing User Registration...');
  try {
    const regData = {
      full_name: 'Debug User',
      email: 'debug@example.com',
      password: 'debug123',
      company_code: 'FURNI123'
    };
    
    console.log('Registration payload:', regData);
    
    const regResponse = await fetch(`${API_BASE_URL}/api/users/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(regData)
    });
    
    console.log('Registration Status:', regResponse.status, regResponse.ok);
    const regResult = await regResponse.json();
    console.log('Registration Result:', regResult);
  } catch (error) {
    console.error('Registration Error:', error);
  }
  
  // Test 3: User Login
  console.log('\n3. Testing User Login...');
  try {
    const loginData = {
      email: 'test@example.com',
      password: 'password123'
    };
    
    console.log('Login payload:', loginData);
    
    const loginResponse = await fetch(`${API_BASE_URL}/api/users/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(loginData)
    });
    
    console.log('Login Status:', loginResponse.status, loginResponse.ok);
    console.log('Login Headers:', Object.fromEntries(loginResponse.headers.entries()));
    
    const loginResult = await loginResponse.json();
    console.log('Login Result:', loginResult);
    console.log('Has token:', !!loginResult.token);
    
    if (loginResult.token) {
      console.log('Token length:', loginResult.token.length);
      console.log('Token preview:', loginResult.token.substring(0, 50) + '...');
    }
    
  } catch (error) {
    console.error('Login Error:', error);
  }
  
  // Test 4: Visitor Registration (without token)
  console.log('\n4. Testing Visitor Registration (no token)...');
  try {
    const visitorData = {
      full_name: 'Debug Visitor',
      email: 'debug@visitor.com',
      phone: '1234567890',
      organization: 'Debug Org',
      designation: 'Debug Role',
      city: 'Debug City',
      country: 'Debug Country',
      interests: 'HOT',
      notes: 'Debug notes',
      follow_up_date: '2026-02-10',
      employee_id: 'debug123'
    };
    
    console.log('Visitor payload:', visitorData);
    
    const visitorResponse = await fetch(`${API_BASE_URL}/api/visitors`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(visitorData)
    });
    
    console.log('Visitor Status:', visitorResponse.status, visitorResponse.ok);
    const visitorResult = await visitorResponse.json();
    console.log('Visitor Result:', visitorResult);
    
  } catch (error) {
    console.error('Visitor Error:', error);
  }
}

debugAPIs();
