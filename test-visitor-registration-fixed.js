// Test visitor registration after debugging was added
const API_BASE_URL = 'https://expo-lead-generation.onrender.com';

async function testVisitorRegistrationFixed() {
  console.log('=== TESTING VISITOR REGISTRATION AFTER DEBUGGING ===');
  
  try {
    // Step 1: Login to get token
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
    console.log('\n2. Testing visitor registration with complete data...');
    const visitorData = {
      full_name: 'Test Visitor Fixed',
      email: 'testfixed@visitor.com',
      phone: '9999999999',
      organization: 'Fixed Test Org',
      designation: 'Fixed Test Role',
      city: 'Fixed Test City',
      country: 'Fixed Test Country',
      interests: 'HOT',
      notes: 'Testing after debugging',
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
    
    // Step 3: Test with minimal data if complete fails
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
    
    // Step 4: Test different interests values
    console.log('\n4. Testing different interests values...');
    const interestsTest = ['HOT', 'Hot', 'hot', 'WARM', 'Cold'];
    
    for (const interest of interestsTest) {
      const testData = {
        full_name: `Test ${interest}`,
        phone: `777${Date.now().toString().slice(-7)}`,
        interests: interest,
        employee_id: loginData.user.id
      };
      
      const testResponse = await fetch(`${API_BASE_URL}/api/visitors`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${loginData.token}`
        },
        body: JSON.stringify(testData)
      });
      
      const testResult = await testResponse.json();
      console.log(`${interest}: Status ${testResponse.status} - ${testResult.error || testResult.message || 'Success'}`);
      
      if (testResponse.status === 201) {
        console.log('✅ SUCCESS: Found working interests format:', interest);
        console.log('Response:', JSON.stringify(testResult, null, 2));
        break;
      }
    }
    
    // Step 5: Test duplicate visitor registration
    console.log('\n5. Testing duplicate visitor registration...');
    const duplicateData = {
      full_name: 'Duplicate Test',
      email: 'duplicate@test.com',
      phone: '9876543210', // Existing phone
      interests: 'HOT',
      employee_id: loginData.user.id
    };
    
    const duplicateResponse = await fetch(`${API_BASE_URL}/api/visitors`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${loginData.token}`
      },
      body: JSON.stringify(duplicateData)
    });
    
    const duplicateResult = await duplicateResponse.json();
    console.log('Duplicate Status:', duplicateResponse.status);
    console.log('Duplicate Response:', JSON.stringify(duplicateResult, null, 2));
    
  } catch (error) {
    console.error('Test error:', error);
  }
}

testVisitorRegistrationFixed();
