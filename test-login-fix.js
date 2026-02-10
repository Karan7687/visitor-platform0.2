// Test login fix with correct endpoints
const API_BASE_URL = 'https://visitor-platform.onrender.com';

async function testLoginFix() {
  console.log('=== TESTING LOGIN FIX ===');
  
  try {
    // Step 1: Test health check
    console.log('\n1. Testing health check...');
    const healthResponse = await fetch(`${API_BASE_URL}/health`);
    console.log('Health Status:', healthResponse.status);
    const healthData = await healthResponse.json();
    console.log('Health Response:', healthData);
    
    // Step 2: Create a test user first
    console.log('\n2. Creating test user...');
    const testUser = {
      full_name: 'Login Test User',
      email: `logintest${Date.now()}@company.com`,
      password: 'password123',
      company_code: 'FURNI123'
    };
    
    const registerResponse = await fetch(`${API_BASE_URL}/api/users/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testUser)
    });
    
    console.log('Register Status:', registerResponse.status);
    const registerData = await registerResponse.json();
    console.log('Register Response:', JSON.stringify(registerData, null, 2));
    
    if (!registerData.user?.id) {
      console.log('❌ Failed to create test user');
      return;
    }
    
    // Step 3: Test login with correct endpoint
    console.log('\n3. Testing login with correct endpoint...');
    console.log('Login URL:', `${API_BASE_URL}/api/users/login`);
    
    const loginResponse = await fetch(`${API_BASE_URL}/api/users/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: testUser.email,
        password: testUser.password
      })
    });
    
    console.log('Login Status:', loginResponse.status);
    const loginData = await loginResponse.json();
    console.log('Login Response:', JSON.stringify(loginData, null, 2));
    
    if (loginResponse.status === 200) {
      console.log('✅ SUCCESS: Login works with corrected endpoint!');
      console.log('✅ User data:', loginData.user);
      console.log('✅ Token received:', loginData.token ? 'yes' : 'no');
    } else {
      console.log('❌ FAILED: Login still has issues');
    }
    
    // Step 4: Test old endpoint to confirm it was broken
    console.log('\n4. Testing old endpoint to confirm it was broken...');
    try {
      const oldEndpointResponse = await fetch(`${API_BASE_URL}/api/mobile/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: testUser.email,
          password: testUser.password
        })
      });
      
      console.log('Old Endpoint Status:', oldEndpointResponse.status);
      if (oldEndpointResponse.status === 404) {
        console.log('✅ CONFIRMED: Old endpoint returns 404 as expected');
      }
    } catch (error) {
      console.log('✅ CONFIRMED: Old endpoint fails as expected');
    }
    
  } catch (error) {
    console.error('Test error:', error);
  }
}

testLoginFix();
