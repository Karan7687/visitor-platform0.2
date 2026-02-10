// Deep dive to find root cause of visitor registration failure
const API_BASE_URL = 'https://expo-lead-generation.onrender.com';

async function findRootCause() {
  console.log('=== FINDING ROOT CAUSE OF VISITOR REGISTRATION FAILURE ===');
  
  try {
    // Step 1: Verify login still works
    console.log('\n1. Verifying login...');
    const loginResponse = await fetch(`${API_BASE_URL}/api/mobile/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'test@example.com',
        password: 'password123'
      })
    });
    
    const loginData = await loginResponse.json();
    console.log('Login Status:', loginResponse.status);
    console.log('Login working:', !!loginData.token);
    
    if (!loginData.token) {
      console.log('❌ Login failed - this is the root cause');
      return;
    }
    
    // Step 2: Test if backend is reachable
    console.log('\n2. Testing backend health...');
    const healthResponse = await fetch(`${API_BASE_URL}/health`);
    console.log('Health Status:', healthResponse.status);
    if (healthResponse.ok) {
      const healthData = await healthResponse.json();
      console.log('Health Response:', healthData);
    }
    
    // Step 3: Test if visitors endpoint exists
    console.log('\n3. Testing if visitors endpoint exists...');
    const optionsResponse = await fetch(`${API_BASE_URL}/api/visitors`, {
      method: 'OPTIONS'
    });
    console.log('OPTIONS Status:', optionsResponse.status);
    console.log('Allowed Methods:', optionsResponse.headers.get('allow'));
    
    // Step 4: Test with GET request first
    console.log('\n4. Testing GET visitors endpoint...');
    const getResponse = await fetch(`${API_BASE_URL}/api/visitors`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${loginData.token}`
      }
    });
    console.log('GET Status:', getResponse.status);
    if (getResponse.ok) {
      const getData = await getResponse.json();
      console.log('GET Response:', JSON.stringify(getData, null, 2));
    }
    
    // Step 5: Test POST with empty body
    console.log('\n5. Testing POST with empty body...');
    try {
      const emptyResponse = await fetch(`${API_BASE_URL}/api/visitors`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${loginData.token}`
        },
        body: JSON.stringify({})
      });
      console.log('Empty POST Status:', emptyResponse.status);
      const emptyResult = await emptyResponse.json();
      console.log('Empty POST Response:', JSON.stringify(emptyResult, null, 2));
    } catch (error) {
      console.log('Empty POST Error:', error.message);
    }
    
    // Step 6: Test POST with minimal valid data
    console.log('\n6. Testing POST with minimal data...');
    const minimalData = {
      full_name: 'Test User',
      phone: '1234567890',
      interests: 'HOT'
    };
    
    try {
      const minimalResponse = await fetch(`${API_BASE_URL}/api/visitors`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${loginData.token}`
        },
        body: JSON.stringify(minimalData)
      });
      console.log('Minimal POST Status:', minimalResponse.status);
      const minimalResult = await minimalResponse.json();
      console.log('Minimal POST Response:', JSON.stringify(minimalResult, null, 2));
    } catch (error) {
      console.log('Minimal POST Error:', error.message);
    }
    
    // Step 7: Test different content types
    console.log('\n7. Testing without Content-Type header...');
    try {
      const noHeaderResponse = await fetch(`${API_BASE_URL}/api/visitors`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${loginData.token}`
        },
        body: JSON.stringify(minimalData)
      });
      console.log('No Header Status:', noHeaderResponse.status);
      const noHeaderResult = await noHeaderResponse.json();
      console.log('No Header Response:', JSON.stringify(noHeaderResult, null, 2));
    } catch (error) {
      console.log('No Header Error:', error.message);
    }
    
    // Step 8: Test without authorization
    console.log('\n8. Testing without Authorization header...');
    try {
      const noAuthResponse = await fetch(`${API_BASE_URL}/api/visitors`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(minimalData)
      });
      console.log('No Auth Status:', noAuthResponse.status);
      const noAuthResult = await noAuthResponse.json();
      console.log('No Auth Response:', JSON.stringify(noAuthResult, null, 2));
    } catch (error) {
      console.log('No Auth Error:', error.message);
    }
    
    // Step 9: Test with malformed JSON
    console.log('\n9. Testing with malformed JSON...');
    try {
      const malformedResponse = await fetch(`${API_BASE_URL}/api/visitors`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${loginData.token}`
        },
        body: '{invalid json}'
      });
      console.log('Malformed JSON Status:', malformedResponse.status);
      const malformedResult = await malformedResponse.json();
      console.log('Malformed JSON Response:', JSON.stringify(malformedResult, null, 2));
    } catch (error) {
      console.log('Malformed JSON Error:', error.message);
    }
    
  } catch (error) {
    console.error('Test error:', error);
  }
}

findRootCause();
