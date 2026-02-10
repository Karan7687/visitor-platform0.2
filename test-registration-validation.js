// Test registration validation in detail
const API_BASE_URL = 'https://expo-lead-generation.onrender.com';

async function testRegistrationValidation() {
  console.log('=== TESTING REGISTRATION VALIDATION ===');
  
  try {
    // First, login to get token
    console.log('\n1. Getting login token...');
    const loginResponse = await fetch(`${API_BASE_URL}/api/mobile/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'test@example.com',
        password: 'password123'
      })
    });
    
    const loginData = await loginResponse.json();
    console.log('Login successful, token received:', !!loginData.token);
    
    // Base data for testing
    const baseData = {
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
      employee_id: 'ae84638c-9b41-4a35-a9a1-b3f5c5b2fa9d'
    };
    
    // Test different variations of interests field
    const testCases = [
      {
        name: 'HOT (uppercase)',
        data: { ...baseData, interests: 'HOT' }
      },
      {
        name: 'Hot (capitalized)',
        data: { ...baseData, interests: 'Hot' }
      },
      {
        name: 'hot (lowercase)',
        data: { ...baseData, interests: 'hot' }
      },
      {
        name: 'WARM (uppercase)',
        data: { ...baseData, interests: 'WARM' }
      },
      {
        name: 'Cold (capitalized)',
        data: { ...baseData, interests: 'Cold' }
      },
      {
        name: 'cold (lowercase)',
        data: { ...baseData, interests: 'cold' }
      }
    ];
    
    for (const testCase of testCases) {
      console.log(`\n2. Testing: ${testCase.name}`);
      console.log('Data:', JSON.stringify(testCase.data, null, 2));
      
      const response = await fetch(`${API_BASE_URL}/api/visitors`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${loginData.token}`
        },
        body: JSON.stringify(testCase.data)
      });
      
      const responseData = await response.json();
      console.log(`Status: ${response.status}`);
      console.log(`Response:`, JSON.stringify(responseData, null, 2));
      
      if (response.status === 201) {
        console.log('✅ SUCCESS: Registration worked!');
      } else {
        console.log('❌ FAILED: Validation error');
      }
    }
    
  } catch (error) {
    console.error('Test error:', error);
  }
}

testRegistrationValidation();
