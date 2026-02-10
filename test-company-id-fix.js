// Test the company ID fix for visitor registration
const API_BASE_URL = 'https://visitor-platform.onrender.com';

async function testCompanyIdFix() {
  console.log('=== TESTING COMPANY ID FIX ===');
  
  try {
    // Step 1: Test health check
    console.log('\n1. Testing health check...');
    const healthResponse = await fetch(`${API_BASE_URL}/health`);
    console.log('Health Status:', healthResponse.status);
    const healthData = await healthResponse.json();
    console.log('Health Response:', healthData);
    
    // Step 2: Get companies
    console.log('\n2. Getting available companies...');
    const companiesResponse = await fetch(`${API_BASE_URL}/companies`);
    console.log('Companies Status:', companiesResponse.status);
    const companiesData = await companiesResponse.json();
    console.log('Available companies:', JSON.stringify(companiesData, null, 2));
    
    // Step 3: Create a test user if needed
    console.log('\n3. Creating test user with company...');
    const testUser = {
      full_name: 'Test Employee',
      email: `testemployee${Date.now()}@company.com`,
      password: 'password123',
      company_code: companiesData.companies?.[0]?.company_code || 'FURNI123'
    };
    
    console.log('Test user data:', testUser);
    
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
    
    // Step 4: Login to get token
    console.log('\n4. Logging in...');
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
    
    // Step 5: Test visitor registration with the fixed employee
    console.log('\n5. Testing visitor registration...');
    const visitorData = {
      full_name: 'Test Visitor',
      email: `visitor${Date.now()}@test.com`,
      phone: `${Date.now().toString().slice(-10)}`,
      organization: 'Test Organization',
      designation: 'Test Designation',
      city: 'Test City',
      country: 'Test Country',
      interests: 'HOT',
      notes: 'Test notes',
      follow_up_date: '2026-02-15',
      employee_id: loginData.user?.id || registerData.user.id
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
      console.log('✅ SUCCESS: Visitor registration works!');
    } else {
      console.log('❌ FAILED: Visitor registration still has issues');
    }
    
  } catch (error) {
    console.error('Test error:', error);
  }
}

testCompanyIdFix();
