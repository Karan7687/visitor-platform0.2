// Test visitor registration with proper authentication
const API_BASE_URL = 'https://expo-lead-generation.onrender.com';

async function testVisitorWithAuth() {
  console.log('=== TESTING VISITOR REGISTRATION WITH AUTH ===');
  
  try {
    // Step 1: Login to get token
    console.log('\n1. Getting authentication token...');
    const loginResponse = await fetch(`${API_BASE_URL}/api/mobile/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'mobile1770709923341@test.com',
        password: 'password123'
      })
    });
    
    const loginData = await loginResponse.json();
    console.log('Login Status:', loginResponse.status);
    
    if (!loginData.token) {
      console.log('❌ No token received');
      return;
    }
    
    console.log('✅ Token received:', loginData.token.substring(0, 50) + '...');
    
    // Step 2: Test visitor registration with token
    console.log('\n2. Testing visitor registration with Bearer token...');
    const visitorData = {
      full_name: 'Auth Test Visitor',
      email: `authvisitor${Date.now()}@test.com`,
      phone: `${Date.now().toString().slice(-10)}`,
      organization: 'Auth Test Organization',
      designation: 'Auth Test Designation',
      city: 'Auth Test City',
      country: 'Auth Test Country',
      interests: 'HOT',
      notes: 'Auth test notes',
      follow_up_date: '2026-02-15',
      employee_id: loginData.user.id
    };
    
    console.log('Visitor data:', JSON.stringify(visitorData, null, 2));
    console.log('Employee ID from login:', loginData.user.id);
    
    const visitorResponse = await fetch(`${API_BASE_URL}/api/visitors`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${loginData.token}`
      },
      body: JSON.stringify(visitorData)
    });
    
    console.log('Visitor Registration Status:', visitorResponse.status);
    console.log('Response Headers:', Object.fromEntries(visitorResponse.headers.entries()));
    
    const visitorResult = await visitorResponse.json();
    console.log('Visitor Registration Response:', JSON.stringify(visitorResult, null, 2));
    
    if (visitorResponse.status === 201) {
      console.log('✅ VISITOR REGISTRATION WITH AUTH WORKS!');
    } else {
      console.log('❌ Visitor registration still failed');
      
      // Try without authentication to see difference
      console.log('\n3. Testing without authentication...');
      const noAuthResponse = await fetch(`${API_BASE_URL}/api/visitors`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(visitorData)
      });
      
      console.log('No Auth Status:', noAuthResponse.status);
      const noAuthResult = await noAuthResponse.json();
      console.log('No Auth Response:', JSON.stringify(noAuthResult, null, 2));
    }
    
    // Step 3: Test phone check with authentication
    console.log('\n4. Testing phone check with authentication...');
    const phoneCheckResponse = await fetch(`${API_BASE_URL}/api/visitors/check-phone/9876543210`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${loginData.token}`
      }
    });
    
    console.log('Phone Check with Auth Status:', phoneCheckResponse.status);
    const phoneCheckResult = await phoneCheckResponse.json();
    console.log('Phone Check with Auth Response:', JSON.stringify(phoneCheckResult, null, 2));
    
  } catch (error) {
    console.error('Test error:', error);
  }
}

testVisitorWithAuth();
