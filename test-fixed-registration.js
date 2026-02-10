// Test user registration after fixing API config
const API_BASE_URL = 'https://expo-lead-generation.onrender.com';

async function testFixedRegistration() {
  console.log('=== TESTING FIXED USER REGISTRATION ===');
  
  try {
    // Test user registration with the correct endpoint
    console.log('\n1. Testing user registration with correct endpoint...');
    const userData = {
      full_name: 'Test User Fixed',
      email: `testfixed${Date.now()}@test.com`,
      phone: '9876543210',
      password: 'password123',
      company_code: 'FURNI123',
      role: 'employee'
    };
    
    console.log('Data being sent:', JSON.stringify(userData, null, 2));
    
    const response = await fetch(`${API_BASE_URL}/api/mobile/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    });
    
    const result = await response.json();
    console.log('Registration Status:', response.status);
    console.log('Registration Response:', JSON.stringify(result, null, 2));
    
    if (response.status === 201) {
      console.log('✅ SUCCESS: User registration is working!');
      console.log('✅ API configuration is correct!');
      console.log('✅ Mobile app should work now!');
    } else {
      console.log('❌ Still failing - need to check further');
    }
    
    // Test login with the new user
    if (response.status === 201) {
      console.log('\n2. Testing login with new user...');
      const loginResponse = await fetch(`${API_BASE_URL}/api/mobile/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: userData.email,
          password: userData.password
        })
      });
      
      const loginResult = await loginResponse.json();
      console.log('Login Status:', loginResponse.status);
      console.log('Login Response:', JSON.stringify(loginResult, null, 2));
      
      if (loginResponse.status === 200) {
        console.log('✅ SUCCESS: Login also working!');
      }
    }
    
  } catch (error) {
    console.error('Test error:', error);
  }
}

testFixedRegistration();
