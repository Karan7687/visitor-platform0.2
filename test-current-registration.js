// Test current visitor registration issue
const API_BASE_URL = 'https://expo-lead-generation.onrender.com';

async function testCurrentRegistration() {
  console.log('=== TESTING CURRENT VISITOR REGISTRATION ISSUE ===');
  
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
    console.log('Login Response:', JSON.stringify(loginData, null, 2));
    
    if (!loginData.token) {
      console.log('❌ No token received - authentication issue');
      return;
    }
    
    // Step 2: Test visitor registration with exact mobile app data
    console.log('\n2. Testing visitor registration with mobile app data...');
    
    // Simulate exact data from mobile app
    const mobileAppData = {
      full_name: 'Test Visitor Mobile',
      email: 'testmobile@visitor.com',
      phone: '5555555555',
      organization: 'Mobile Test Org',
      designation: 'Mobile Test Role',
      city: 'Mobile Test City',
      country: 'Mobile Test Country',
      interests: 'HOT',
      notes: 'Mobile test notes',
      follow_up_date: '2026-02-10',
      employee_id: loginData.user.id
    };
    
    console.log('Data being sent:', JSON.stringify(mobileAppData, null, 2));
    
    const visitorResponse = await fetch(`${API_BASE_URL}/api/visitors`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${loginData.token}`
      },
      body: JSON.stringify(mobileAppData)
    });
    
    const visitorData = await visitorResponse.json();
    console.log('Visitor Registration Status:', visitorResponse.status);
    console.log('Visitor Registration Response:', JSON.stringify(visitorData, null, 2));
    
    // Step 3: Test without problematic fields
    console.log('\n3. Testing without notes and follow_up_date...');
    const minimalData = {
      full_name: 'Test Visitor Minimal',
      email: 'testminimal@visitor.com',
      phone: '6666666666',
      organization: 'Minimal Test Org',
      designation: 'Minimal Test Role',
      city: 'Minimal Test City',
      country: 'Minimal Test Country',
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
    console.log('Minimal Registration Status:', minimalResponse.status);
    console.log('Minimal Registration Response:', JSON.stringify(minimalResult, null, 2));
    
    // Step 4: Test employee ID validation
    console.log('\n4. Testing employee ID validation...');
    const testEmployeeIds = [
      loginData.user.id,
      loginData.user.email,
      'test@example.com',
      'employee'
    ];
    
    for (const empId of testEmployeeIds) {
      console.log(`\nTesting employee_id: ${empId}`);
      
      const testData = {
        full_name: `Test Visitor ${empId}`,
        email: `test${Date.now()}@visitor.com`,
        phone: `777${Date.now().toString().slice(-7)}`,
        organization: 'Test Org',
        designation: 'Test Role',
        city: 'Test City',
        country: 'Test Country',
        interests: 'HOT',
        employee_id: empId
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
      console.log(`Status: ${testResponse.status}`);
      console.log(`Response: ${JSON.stringify(testResult, null, 2)}`);
      
      if (testResponse.status === 201) {
        console.log('✅ SUCCESS: This employee_id works!');
        break;
      }
    }
    
  } catch (error) {
    console.error('Test error:', error);
  }
}

testCurrentRegistration();
