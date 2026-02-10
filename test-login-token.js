// Test login token generation specifically
const API_BASE_URL = 'https://visitor-platform.onrender.com';

async function testLoginToken() {
  console.log('=== TESTING LOGIN TOKEN GENERATION ===');
  
  try {
    // Use the existing test user from previous test
    const loginResponse = await fetch(`${API_BASE_URL}/api/users/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'logintest1770709682105@company.com',
        password: 'password123'
      })
    });
    
    console.log('Login Status:', loginResponse.status);
    console.log('Login Headers:', Object.fromEntries(loginResponse.headers.entries()));
    
    const loginData = await loginResponse.json();
    console.log('Full Login Response:', JSON.stringify(loginData, null, 2));
    
    if (loginData.token) {
      console.log('✅ Token received:', loginData.token.substring(0, 50) + '...');
      console.log('✅ Token length:', loginData.token.length);
    } else {
      console.log('❌ No token in response');
    }
    
    // Test with a fresh user to see if token generation works
    console.log('\n--- Testing with fresh user ---');
    const freshUser = {
      full_name: 'Fresh Token Test',
      email: `freshtoken${Date.now()}@company.com`,
      password: 'password123',
      company_code: 'FURNI123'
    };
    
    const registerResponse = await fetch(`${API_BASE_URL}/api/users/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(freshUser)
    });
    
    const registerData = await registerResponse.json();
    console.log('Fresh user registered:', registerData.user?.email);
    
    if (registerData.user?.email) {
      const freshLoginResponse = await fetch(`${API_BASE_URL}/api/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: freshUser.email,
          password: 'password123'
        })
      });
      
      const freshLoginData = await freshLoginResponse.json();
      console.log('Fresh Login Response:', JSON.stringify(freshLoginData, null, 2));
      
      if (freshLoginData.token) {
        console.log('✅ Fresh user token received:', freshLoginData.token.substring(0, 50) + '...');
      } else {
        console.log('❌ No token for fresh user either');
      }
    }
    
  } catch (error) {
    console.error('Test error:', error);
  }
}

testLoginToken();
