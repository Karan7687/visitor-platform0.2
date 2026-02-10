// Test different company field names for visitor registration
const API_BASE_URL = 'https://expo-lead-generation.onrender.com';

async function testCompanyField() {
  console.log('=== TESTING COMPANY FIELD NAMES ===');
  
  try {
    // Get login token first
    const loginResponse = await fetch(`${API_BASE_URL}/api/mobile/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'complete1770709980149@test.com',
        password: 'password123'
      })
    });
    
    const loginData = await loginResponse.json();
    if (!loginData.token) {
      console.log('❌ Could not get token');
      return;
    }
    
    console.log('✅ Got token, testing different company field names...');
    
    // Test 1: company_id (from user data)
    console.log('\n1. Testing with company_id from user data...');
    const visitor1 = {
      full_name: 'Test Visitor 1',
      email: `test1${Date.now()}@test.com`,
      phone: '1111111111',
      employee_id: loginData.user.id,
      company_id: loginData.user.company_id
    };
    
    const response1 = await fetch(`${API_BASE_URL}/api/visitors`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${loginData.token}`
      },
      body: JSON.stringify(visitor1)
    });
    
    console.log('Response 1 Status:', response1.status);
    const result1 = await response1.json();
    console.log('Response 1:', JSON.stringify(result1, null, 2));
    
    // Test 2: companyId (camelCase, from JWT debug info)
    console.log('\n2. Testing with companyId (camelCase)...');
    const visitor2 = {
      full_name: 'Test Visitor 2',
      email: `test2${Date.now()}@test.com`,
      phone: '2222222222',
      employee_id: loginData.user.id,
      companyId: loginData.user.company_id
    };
    
    const response2 = await fetch(`${API_BASE_URL}/api/visitors`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${loginData.token}`
      },
      body: JSON.stringify(visitor2)
    });
    
    console.log('Response 2 Status:', response2.status);
    const result2 = await response2.json();
    console.log('Response 2:', JSON.stringify(result2, null, 2));
    
    // Test 3: Both fields
    console.log('\n3. Testing with both company_id and companyId...');
    const visitor3 = {
      full_name: 'Test Visitor 3',
      email: `test3${Date.now()}@test.com`,
      phone: '3333333333',
      employee_id: loginData.user.id,
      company_id: loginData.user.company_id,
      companyId: loginData.user.company_id
    };
    
    const response3 = await fetch(`${API_BASE_URL}/api/visitors`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${loginData.token}`
      },
      body: JSON.stringify(visitor3)
    });
    
    console.log('Response 3 Status:', response3.status);
    const result3 = await response3.json();
    console.log('Response 3:', JSON.stringify(result3, null, 2));
    
    // Test 4: No company fields (to see exact error)
    console.log('\n4. Testing without any company field...');
    const visitor4 = {
      full_name: 'Test Visitor 4',
      email: `test4${Date.now()}@test.com`,
      phone: '4444444444',
      employee_id: loginData.user.id
    };
    
    const response4 = await fetch(`${API_BASE_URL}/api/visitors`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${loginData.token}`
      },
      body: JSON.stringify(visitor4)
    });
    
    console.log('Response 4 Status:', response4.status);
    const result4 = await response4.json();
    console.log('Response 4:', JSON.stringify(result4, null, 2));
    
  } catch (error) {
    console.error('Test error:', error);
  }
}

testCompanyField();
