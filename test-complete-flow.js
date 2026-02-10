// Test complete authentication and visitor registration flow
const API_BASE_URL = 'https://visitor-platform.onrender.com';

async function testCompleteFlow() {
  console.log('=== TESTING COMPLETE AUTH FLOW ===');
  
  try {
    // Step 1: Test login
    console.log('\n1. Testing login...');
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
      console.log('✅ Token received:', loginData.token.substring(0, 50) + '...');
      
      // Step 2: Test visitor registration with token
      console.log('\n2. Testing visitor registration with token...');
      const visitorResponse = await fetch(`${API_BASE_URL}/api/visitors`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${loginData.token}`
        },
        body: JSON.stringify({
          full_name: 'Test Visitor',
          email: 'test@visitor.com',
          phone: '1234567890',
          organization: 'Test Org',
          designation: 'Test Role',
          city: 'Test City',
          country: 'Test Country',
          interests: 'HOT',
          notes: 'Test notes',
          follow_up_date: '2026-02-10',
          employee_id: loginData.user.id
        })
      });
      
      const visitorData = await visitorResponse.json();
      console.log('Visitor Registration Status:', visitorResponse.status);
      console.log('Visitor Registration Response:', visitorData);
      
      if (visitorResponse.status === 201) {
        console.log('🎉 SUCCESS: Complete authentication flow working!');
      } else {
        console.log('❌ FAILED: Visitor registration failed');
      }
    } else {
      console.log('❌ FAILED: No token received from login');
    }
    
  } catch (error) {
    console.error('Test error:', error);
  }
}

testCompleteFlow();
