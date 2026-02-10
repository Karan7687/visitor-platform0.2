// Test SQL columns issue
const API_BASE_URL = 'https://expo-lead-generation.onrender.com';

async function testSqlColumns() {
  console.log('=== TESTING SQL COLUMNS ISSUE ===');
  
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
    
    // Test with different field combinations to identify the issue
    const testCases = [
      {
        name: 'Only required fields',
        data: {
          full_name: 'Test Required',
          phone: '1111111111',
          interests: 'HOT',
          employee_id: loginData.user.id
        }
      },
      {
        name: 'Add email',
        data: {
          full_name: 'Test Email',
          email: 'test@email.com',
          phone: '2222222222',
          interests: 'HOT',
          employee_id: loginData.user.id
        }
      },
      {
        name: 'Add organization',
        data: {
          full_name: 'Test Org',
          phone: '3333333333',
          organization: 'Test Org',
          interests: 'HOT',
          employee_id: loginData.user.id
        }
      },
      {
        name: 'Add designation',
        data: {
          full_name: 'Test Designation',
          phone: '4444444444',
          designation: 'Test Role',
          interests: 'HOT',
          employee_id: loginData.user.id
        }
      },
      {
        name: 'Add city',
        data: {
          full_name: 'Test City',
          phone: '5555555555',
          city: 'Test City',
          interests: 'HOT',
          employee_id: loginData.user.id
        }
      },
      {
        name: 'Add country',
        data: {
          full_name: 'Test Country',
          phone: '6666666666',
          country: 'Test Country',
          interests: 'HOT',
          employee_id: loginData.user.id
        }
      },
      {
        name: 'Add notes',
        data: {
          full_name: 'Test Notes',
          phone: '7777777777',
          notes: 'Test notes',
          interests: 'HOT',
          employee_id: loginData.user.id
        }
      },
      {
        name: 'Add follow_up_date',
        data: {
          full_name: 'Test Date',
          phone: '8888888888',
          follow_up_date: '2026-02-10',
          interests: 'HOT',
          employee_id: loginData.user.id
        }
      }
    ];
    
    for (const testCase of testCases) {
      console.log(`\n--- Testing: ${testCase.name} ---`);
      console.log('Data:', JSON.stringify(testCase.data, null, 2));
      
      const response = await fetch(`${API_BASE_URL}/api/visitors`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${loginData.token}`
        },
        body: JSON.stringify(testCase.data)
      });
      
      const result = await response.json();
      console.log(`Status: ${response.status}`);
      console.log(`Response: ${JSON.stringify(result, null, 2)}`);
      
      if (response.status === 201) {
        console.log('✅ SUCCESS: This combination works!');
        break;
      }
    }
    
  } catch (error) {
    console.error('Test error:', error);
  }
}

testSqlColumns();
