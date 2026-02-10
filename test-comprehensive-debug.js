// Comprehensive debug test to find exact root cause
const API_BASE_URL = 'https://expo-lead-generation.onrender.com';

async function comprehensiveDebug() {
  console.log('=== COMPREHENSIVE DEBUG - FINDING EXACT ROOT CAUSE ===');
  
  try {
    // Step 1: Verify login and get token
    console.log('\n1. LOGIN TEST');
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
    console.log('User ID:', loginData.user?.id);
    
    if (!loginData.token) {
      console.log('❌ LOGIN FAILED - Root cause found');
      return;
    }
    
    // Step 2: Test backend health
    console.log('\n2. BACKEND HEALTH TEST');
    const healthResponse = await fetch(`${API_BASE_URL}/health`);
    console.log('Health Status:', healthResponse.status);
    if (healthResponse.ok) {
      const healthData = await healthResponse.json();
      console.log('Health Response:', healthData);
    }
    
    // Step 3: Test visitor endpoint exists
    console.log('\n3. VISITOR ENDPOINT TEST');
    const optionsResponse = await fetch(`${API_BASE_URL}/api/visitors`, {
      method: 'OPTIONS'
    });
    console.log('OPTIONS Status:', optionsResponse.status);
    
    // Step 4: Test with absolute minimum data
    console.log('\n4. MINIMUM DATA TEST');
    const minimumData = {
      full_name: 'Test',
      phone: '1234567890'
    };
    
    const minResponse = await fetch(`${API_BASE_URL}/api/visitors`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${loginData.token}`
      },
      body: JSON.stringify(minimumData)
    });
    
    const minResult = await minResponse.json();
    console.log('Minimum Data Status:', minResponse.status);
    console.log('Minimum Data Response:', JSON.stringify(minResult, null, 2));
    
    // Step 5: Test field by field to find the problematic one
    console.log('\n5. FIELD BY FIELD TEST');
    const baseData = {
      full_name: 'Test User',
      phone: '1111111111'
    };
    
    const fields = [
      { name: 'interests', value: 'HOT' },
      { name: 'email', value: 'test@test.com' },
      { name: 'organization', value: 'Test Org' },
      { name: 'designation', value: 'Test Role' },
      { name: 'city', value: 'Test City' },
      { name: 'country', value: 'Test Country' },
      { name: 'notes', value: 'Test notes' },
      { name: 'follow_up_date', value: '2026-02-10' },
      { name: 'employee_id', value: loginData.user.id }
    ];
    
    for (const field of fields) {
      const testData = { ...baseData, [field.name]: field.value };
      console.log(`\n--- Testing with ${field.name} ---`);
      console.log('Data:', JSON.stringify(testData, null, 2));
      
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
        console.log('✅ SUCCESS: Found working combination!');
        return;
      }
    }
    
    // Step 6: Test without employee_id specifically
    console.log('\n6. NO EMPLOYEE_ID TEST');
    const noEmpData = {
      full_name: 'Test No Emp',
      phone: '2222222222',
      interests: 'HOT'
    };
    
    const noEmpResponse = await fetch(`${API_BASE_URL}/api/visitors`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${loginData.token}`
      },
      body: JSON.stringify(noEmpData)
    });
    
    const noEmpResult = await noEmpResponse.json();
    console.log('No Employee Status:', noEmpResponse.status);
    console.log('No Employee Response:', JSON.stringify(noEmpResult, null, 2));
    
    // Step 7: Test with different employee_id values
    console.log('\n7. EMPLOYEE_ID VALUES TEST');
    const empIds = [
      loginData.user.id,
      loginData.user.email,
      'test@example.com',
      'employee',
      '',
      null
    ];
    
    for (const empId of empIds) {
      const empData = {
        full_name: 'Test Emp',
        phone: `333${Date.now().toString().slice(-7)}`,
        interests: 'HOT'
      };
      
      if (empId !== null) {
        empData.employee_id = empId;
      }
      
      const empResponse = await fetch(`${API_BASE_URL}/api/visitors`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${loginData.token}`
        },
        body: JSON.stringify(empData)
      });
      
      const empResult = await empResponse.json();
      console.log(`Employee ID "${empId}": Status ${empResponse.status} - ${empResult.error || empResult.message || 'Success'}`);
      
      if (empResponse.status === 201) {
        console.log('✅ SUCCESS: Found working employee_id!');
        console.log('Response:', JSON.stringify(empResult, null, 2));
        return;
      }
    }
    
    console.log('\n=== ROOT CAUSE SUMMARY ===');
    console.log('❌ All tests failed - Backend has internal error');
    console.log('❌ Issue is NOT in mobile app - it\'s in backend code');
    console.log('❌ Backend SQL query or database connection is broken');
    
  } catch (error) {
    console.error('Test error:', error);
  }
}

comprehensiveDebug();
