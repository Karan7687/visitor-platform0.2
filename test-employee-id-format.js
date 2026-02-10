// Test employee_id format requirements
const API_BASE_URL = 'https://expo-lead-generation.onrender.com';

async function testEmployeeIdFormat() {
  console.log('=== TESTING EMPLOYEE ID FORMAT REQUIREMENTS ===');
  
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
    console.log('Login successful');
    
    // Test different employee_id scenarios
    const testCases = [
      {
        name: 'Valid UUID from login',
        employee_id: loginData.user.id,
        data: {
          full_name: 'Test UUID',
          phone: '1111111111',
          interests: 'HOT'
        }
      },
      {
        name: 'No employee_id field',
        employee_id: null,
        data: {
          full_name: 'Test No ID',
          phone: '2222222222',
          interests: 'HOT'
        }
      },
      {
        name: 'Empty string employee_id',
        employee_id: '',
        data: {
          full_name: 'Test Empty',
          phone: '3333333333',
          interests: 'HOT'
        }
      },
      {
        name: 'Null employee_id',
        employee_id: null,
        data: {
          full_name: 'Test Null',
          phone: '4444444444',
          interests: 'HOT',
          employee_id: null
        }
      }
    ];
    
    for (const testCase of testCases) {
      console.log(`\n--- Testing: ${testCase.name} ---`);
      
      const testData = { ...testCase.data };
      if (testCase.employee_id !== null) {
        testData.employee_id = testCase.employee_id;
      }
      
      console.log('Data being sent:', JSON.stringify(testData, null, 2));
      
      try {
        const response = await fetch(`${API_BASE_URL}/api/visitors`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${loginData.token}`
          },
          body: JSON.stringify(testData)
        });
        
        const result = await response.json();
        console.log(`Status: ${response.status}`);
        console.log(`Response: ${JSON.stringify(result, null, 2)}`);
        
        if (response.status === 201) {
          console.log('✅ SUCCESS: This format works!');
        }
      } catch (error) {
        console.log(`Error: ${error.message}`);
      }
    }
    
    // Test what happens when we remove employee_id completely
    console.log('\n--- Testing: Completely remove employee_id field ---');
    const noIdData = {
      full_name: 'Test Complete Remove',
      phone: '5555555555',
      interests: 'HOT'
    };
    
    const noIdResponse = await fetch(`${API_BASE_URL}/api/visitors`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${loginData.token}`
      },
      body: JSON.stringify(noIdData)
    });
    
    const noIdResult = await noIdResponse.json();
    console.log('No ID Status:', noIdResponse.status);
    console.log('No ID Response:', JSON.stringify(noIdResult, null, 2));
    
  } catch (error) {
    console.error('Test error:', error);
  }
}

testEmployeeIdFormat();
