// Test JWT generation directly on backend
const API_BASE_URL = 'https://visitor-platform.onrender.com';

async function testJWTGeneration() {
  console.log('=== TESTING JWT GENERATION ===');
  
  try {
    // Test login to see if token is generated
    const loginResponse = await fetch(`${API_BASE_URL}/api/users/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'test@example.com',
        password: 'password123'
      })
    });
    
    const loginData = await loginResponse.json();
    console.log('Login Status:', loginResponse.status);
    console.log('Login Response:', loginData);
    
    if (loginData.token) {
      console.log('✅ SUCCESS: Token received:', loginData.token.substring(0, 50) + '...');
      console.log('🎉 JWT generation is working on Render!');
    } else {
      console.log('❌ FAILED: Still no token in response');
      console.log('Response keys:', Object.keys(loginData));
    }
    
  } catch (error) {
    console.error('Test error:', error);
  }
}

testJWTGeneration();
