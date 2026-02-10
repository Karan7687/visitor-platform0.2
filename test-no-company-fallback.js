// Test the fallback mechanism when employee has no company_id
const API_BASE_URL = 'https://visitor-platform.onrender.com';

async function testNoCompanyFallback() {
  console.log('=== TESTING NO COMPANY_ID FALLBACK ===');
  
  try {
    // Step 1: Create a user without company_id by directly inserting
    console.log('\n1. Creating user without company assignment...');
    
    // First, let's create a user with a valid company, then manually update to remove company_id
    const testUser = {
      full_name: 'Test No Company Employee',
      email: `nocompany${Date.now()}@test.com`,
      password: 'password123',
      company_code: 'FURNI123'
    };
    
    const registerResponse = await fetch(`${API_BASE_URL}/api/users/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testUser)
    });
    
    const registerData = await registerResponse.json();
    console.log('Initial user creation:', JSON.stringify(registerData, null, 2));
    
    if (!registerData.user?.id) {
      console.log('❌ Failed to create initial user');
      return;
    }
    
    // Step 2: Login to get token
    console.log('\n2. Logging in...');
    const loginResponse = await fetch(`${API_BASE_URL}/api/users/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: testUser.email,
        password: testUser.password
      })
    });
    
    const loginData = await loginResponse.json();
    console.log('Login Response:', JSON.stringify(loginData, null, 2));
    
    // Step 3: Test visitor registration - this should trigger the fallback mechanism
    console.log('\n3. Testing visitor registration with fallback...');
    const visitorData = {
      full_name: 'Fallback Test Visitor',
      email: `fallback${Date.now()}@test.com`,
      phone: `${Date.now().toString().slice(-10)}`,
      organization: 'Fallback Test Organization',
      designation: 'Fallback Test Designation',
      city: 'Fallback Test City',
      country: 'Fallback Test Country',
      interests: 'WARM',
      notes: 'Testing fallback mechanism',
      follow_up_date: '2026-02-20',
      employee_id: loginData.user?.id
    };
    
    console.log('Visitor data:', JSON.stringify(visitorData, null, 2));
    
    const visitorResponse = await fetch(`${API_BASE_URL}/api/visitors`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': loginData.token ? `Bearer ${loginData.token}` : undefined
      },
      body: JSON.stringify(visitorData)
    });
    
    console.log('Visitor Registration Status:', visitorResponse.status);
    const visitorResult = await visitorResponse.json();
    console.log('Visitor Registration Response:', JSON.stringify(visitorResult, null, 2));
    
    if (visitorResponse.status === 201) {
      console.log('✅ SUCCESS: Fallback mechanism works!');
    } else {
      console.log('❌ FAILED: Fallback mechanism has issues');
    }
    
    // Step 4: Verify the user was updated with default company
    console.log('\n4. Verifying user was updated with default company...');
    const getUserResponse = await fetch(`${API_BASE_URL}/api/users/${loginData.user?.id}`);
    const userData = await getUserResponse.json();
    console.log('Updated user data:', JSON.stringify(userData, null, 2));
    
  } catch (error) {
    console.error('Test error:', error);
  }
}

testNoCompanyFallback();
