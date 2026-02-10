// Test user registration API to identify the issue
const API_BASE_URL = 'https://expo-lead-generation.onrender.com';

async function testUserRegistration() {
  console.log('=== TESTING USER REGISTRATION ISSUE ===');
  
  try {
    // Step 1: Test backend health
    console.log('\n1. Testing backend health...');
    const healthResponse = await fetch(`${API_BASE_URL}/health`);
    console.log('Health Status:', healthResponse.status);
    if (healthResponse.ok) {
      const healthData = await healthResponse.json();
      console.log('Health Response:', healthData);
    }
    
    // Step 2: Test user registration endpoint exists
    console.log('\n2. Testing user registration endpoint...');
    const optionsResponse = await fetch(`${API_BASE_URL}/api/mobile/register`, {
      method: 'OPTIONS'
    });
    console.log('OPTIONS Status:', optionsResponse.status);
    console.log('Allowed Methods:', optionsResponse.headers.get('allow'));
    
    // Step 3: Test user registration with valid data
    console.log('\n3. Testing user registration with valid data...');
    const userData = {
      full_name: 'Test User Registration',
      email: `testuser${Date.now()}@test.com`,
      phone: '9876543210',
      password: 'password123',
      company_code: 'FURNI123',
      role: 'employee'
    };
    
    console.log('Data being sent:', JSON.stringify(userData, null, 2));
    
    const response = await fetch(`${API_BASE_URL}/api/mobile/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    });
    
    const result = await response.json();
    console.log('Registration Status:', response.status);
    console.log('Registration Response:', JSON.stringify(result, null, 2));
    
    // Step 4: Test with minimal data
    console.log('\n4. Testing with minimal data...');
    const minimalData = {
      email: `minimal${Date.now()}@test.com`,
      password: 'password123'
    };
    
    const minimalResponse = await fetch(`${API_BASE_URL}/api/mobile/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(minimalData)
    });
    
    const minimalResult = await minimalResponse.json();
    console.log('Minimal Status:', minimalResponse.status);
    console.log('Minimal Response:', JSON.stringify(minimalResult, null, 2));
    
    // Step 5: Test with different field combinations
    console.log('\n5. Testing different field combinations...');
    const testCases = [
      {
        name: 'Only email and password',
        data: {
          email: `test${Date.now()}@test.com`,
          password: 'password123'
        }
      },
      {
        name: 'Add full_name',
        data: {
          full_name: 'Test Name',
          email: `test${Date.now()}@test.com`,
          password: 'password123'
        }
      },
      {
        name: 'Add phone',
        data: {
          full_name: 'Test Name',
          email: `test${Date.now()}@test.com`,
          phone: '9876543210',
          password: 'password123'
        }
      },
      {
        name: 'Add company_code',
        data: {
          full_name: 'Test Name',
          email: `test${Date.now()}@test.com`,
          phone: '9876543210',
          password: 'password123',
          company_code: 'FURNI123'
        }
      },
      {
        name: 'Add role',
        data: {
          full_name: 'Test Name',
          email: `test${Date.now()}@test.com`,
          phone: '9876543210',
          password: 'password123',
          company_code: 'FURNI123',
          role: 'employee'
        }
      }
    ];
    
    for (const testCase of testCases) {
      console.log(`\n--- Testing: ${testCase.name} ---`);
      console.log('Data:', JSON.stringify(testCase.data, null, 2));
      
      const testResponse = await fetch(`${API_BASE_URL}/api/mobile/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(testCase.data)
      });
      
      const testResult = await testResponse.json();
      console.log(`Status: ${testResponse.status}`);
      console.log(`Response: ${JSON.stringify(testResult, null, 2)}`);
      
      if (testResponse.status === 201) {
        console.log('✅ SUCCESS: Found working combination!');
        break;
      }
    }
    
    // Step 6: Test if the endpoint exists at all
    console.log('\n6. Testing if endpoint exists...');
    try {
      const getResponse = await fetch(`${API_BASE_URL}/api/mobile/register`, {
        method: 'GET'
      });
      console.log('GET Status:', getResponse.status);
    } catch (error) {
      console.log('GET Error:', error.message);
    }
    
  } catch (error) {
    console.error('Test error:', error);
  }
}

testUserRegistration();
