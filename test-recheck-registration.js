// Recheck visitor registration after backend fix
const API_BASE_URL = 'https://expo-lead-generation.onrender.com';

async function recheckRegistration() {
  console.log('=== RECHECKING VISITOR REGISTRATION ===');
  
  try {
    // Step 1: Login
    console.log('\n1. Testing login...');
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
      console.log('❌ Login failed');
      return;
    }
    
    // Step 2: Test visitor registration with complete data
    console.log('\n2. Testing visitor registration...');
    const visitorData = {
      full_name: 'Test Visitor Recheck',
      email: 'recheck@visitor.com',
      phone: '9999999999',
      organization: 'Recheck Test Org',
      designation: 'Recheck Test Role',
      city: 'Recheck Test City',
      country: 'Recheck Test Country',
      interests: 'HOT',
      notes: 'Testing after backend fix',
      follow_up_date: '2026-02-10',
      employee_id: loginData.user.id
    };
    
    console.log('Data being sent:', JSON.stringify(visitorData, null, 2));
    
    const response = await fetch(`${API_BASE_URL}/api/visitors`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${loginData.token}`
      },
      body: JSON.stringify(visitorData)
    });
    
    const result = await response.json();
    console.log('Registration Status:', response.status);
    console.log('Registration Response:', JSON.stringify(result, null, 2));
    
    // Step 3: Check if it's working now
    if (response.status === 201) {
      console.log('✅ SUCCESS: Visitor registration is working!');
      console.log('✅ Backend has been fixed!');
    } else if (response.status === 500) {
      console.log('❌ STILL BROKEN: Same 500 error');
      console.log('❌ Backend still has SQL column mismatch');
      console.log('❌ Tell your friend to check INSERT statement');
    } else {
      console.log('⚠️ DIFFERENT ERROR: New error type');
      console.log('⚠️ Status:', response.status);
      console.log('⚠️ Error:', result.error);
    }
    
    // Step 4: Test with minimal data if complete fails
    if (response.status !== 201) {
      console.log('\n3. Testing with minimal data...');
      const minimalData = {
        full_name: 'Minimal Test',
        phone: '8888888888',
        interests: 'HOT',
        employee_id: loginData.user.id
      };
      
      const minimalResponse = await fetch(`${API_BASE_URL}/api/visitors`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${loginData.token}`
        },
        body: JSON.stringify(minimalData)
      });
      
      const minimalResult = await minimalResponse.json();
      console.log('Minimal Status:', minimalResponse.status);
      console.log('Minimal Response:', JSON.stringify(minimalResult, null, 2));
    }
    
  } catch (error) {
    console.error('Test error:', error);
  }
}

recheckRegistration();
