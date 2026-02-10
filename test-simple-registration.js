// Test simple visitor registration to find the exact issue
const API_BASE_URL = 'https://expo-lead-generation.onrender.com';

async function testSimpleRegistration() {
  console.log('=== TESTING SIMPLE VISITOR REGISTRATION ===');
  
  try {
    // Login first
    const loginResponse = await fetch(`${API_BASE_URL}/api/mobile/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'test@example.com',
        password: 'password123'
      })
    });
    
    const loginData = await loginResponse.json();
    console.log('Token received:', !!loginData.token);
    
    // Test with absolute minimum data
    console.log('\n1. Testing with MINIMUM possible data...');
    const minimumData = {
      full_name: 'Simple Test',
      phone: '9999999999',
      interests: 'HOT',
      employee_id: loginData.user.id
    };
    
    console.log('Sending:', JSON.stringify(minimumData, null, 2));
    
    const response = await fetch(`${API_BASE_URL}/api/visitors`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${loginData.token}`
      },
      body: JSON.stringify(minimumData)
    });
    
    const result = await response.json();
    console.log('Status:', response.status);
    console.log('Response:', JSON.stringify(result, null, 2));
    
    // Test if the issue is with interests field
    console.log('\n2. Testing with different interests values...');
    const interestsTest = ['HOT', 'Hot', 'hot', 'WARM', 'Warm', 'warm', 'COLD', 'Cold', 'cold'];
    
    for (const interest of interestsTest) {
      const testData = {
        ...minimumData,
        full_name: `Test ${interest}`,
        phone: `888${Date.now().toString().slice(-7)}`,
        interests: interest
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
      console.log(`${interest}: Status ${testResponse.status} - ${testResult.error || testResult.message}`);
      
      if (testResponse.status === 201) {
        console.log('✅ SUCCESS: Found working interests format:', interest);
        break;
      }
    }
    
    // Test if the issue is with employee_id
    console.log('\n3. Testing without employee_id...');
    const noEmployeeData = {
      full_name: 'No Employee Test',
      phone: '7777777777',
      interests: 'HOT'
    };
    
    const noEmpResponse = await fetch(`${API_BASE_URL}/api/visitors`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${loginData.token}`
      },
      body: JSON.stringify(noEmployeeData)
    });
    
    const noEmpResult = await noEmpResponse.json();
    console.log('No Employee Status:', noEmpResponse.status);
    console.log('No Employee Response:', JSON.stringify(noEmpResult, null, 2));
    
  } catch (error) {
    console.error('Test error:', error);
  }
}

testSimpleRegistration();
