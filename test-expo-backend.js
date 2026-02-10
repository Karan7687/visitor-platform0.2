// Test expo-lead-generation.onrender.com backend APIs
const API_BASE_URL = 'https://expo-lead-generation.onrender.com';

async function testExpoBackend() {
  console.log('=== TESTING EXPO-LEAD-GENERATION BACKEND ===');
  
  try {
    // Test 1: Health check
    console.log('\n1. Testing health endpoint...');
    const healthResponse = await fetch(`${API_BASE_URL}/health`);
    console.log('Health Status:', healthResponse.status);
    if (healthResponse.ok) {
      const healthData = await healthResponse.json();
      console.log('Health Response:', healthData);
    } else {
      console.log('❌ Health endpoint failed');
    }

    // Test 2: Login
    console.log('\n2. Testing login endpoint...');
    const loginResponse = await fetch(`${API_BASE_URL}/api/mobile/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'test@example.com',
        password: 'password123'
      })
    });
    console.log('Login Status:', loginResponse.status);
    const loginData = await loginResponse.json();
    console.log('Login Response:', loginData);

    // Test 3: Visitor registration (with token if available)
    console.log('\n3. Testing visitor registration...');
    const visitorData = {
      full_name: 'Test Visitor',
      email: 'test@visitor.com',
      phone: '9876543210',
      organization: 'Test Org',
      designation: 'Test Role',
      city: 'Test City',
      country: 'Test Country',
      interests: 'HOT',
      notes: 'Test notes',
      follow_up_date: '2026-02-10',
      employee_id: 'test-user-id'
    };

    const visitorResponse = await fetch(`${API_BASE_URL}/api/visitors`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        ...(loginData.token ? { 'Authorization': `Bearer ${loginData.token}` } : {})
      },
      body: JSON.stringify(visitorData)
    });
    console.log('Visitor Registration Status:', visitorResponse.status);
    const visitorDataResponse = await visitorResponse.json();
    console.log('Visitor Registration Response:', visitorDataResponse);

    // Test 4: Phone suggestions
    console.log('\n4. Testing phone suggestions...');
    const suggestionsResponse = await fetch(`${API_BASE_URL}/api/visitors/phone-suggestions/987`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
    console.log('Suggestions Status:', suggestionsResponse.status);
    if (suggestionsResponse.ok) {
      const suggestionsData = await suggestionsResponse.json();
      console.log('Suggestions Response:', suggestionsData);
    } else {
      const errorData = await suggestionsResponse.json();
      console.log('Suggestions Error:', errorData);
    }

    // Test 5: Check phone
    console.log('\n5. Testing check phone...');
    const checkPhoneResponse = await fetch(`${API_BASE_URL}/api/visitors/check-phone/9876543210`, {
      method: 'GET',
      headers: { 
        'Content-Type': 'application/json',
        ...(loginData.token ? { 'Authorization': `Bearer ${loginData.token}` } : {})
      }
    });
    console.log('Check Phone Status:', checkPhoneResponse.status);
    const checkPhoneData = await checkPhoneResponse.json();
    console.log('Check Phone Response:', checkPhoneData);

  } catch (error) {
    console.error('Test error:', error);
  }
}

testExpoBackend();
