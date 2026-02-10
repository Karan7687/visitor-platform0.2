// Test employee ID mismatch issue
const API_BASE_URL = 'https://expo-lead-generation.onrender.com';

async function testEmployeeId() {
  console.log('=== TESTING EMPLOYEE ID MISMATCH ===');
  
  try {
    // Login to get token and user info
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
    console.log('User ID from login:', loginData.user.id);
    console.log('User Role:', loginData.user.role);
    console.log('Company ID:', loginData.user.company_id);
    
    // Test Case 1: Correct employee ID (from login)
    console.log('\n1. Testing with CORRECT employee ID...');
    const correctData = {
      full_name: 'Test Visitor Correct',
      email: 'correct@test.com',
      phone: '8888888888',
      organization: 'Test Org',
      designation: 'Test Role',
      city: 'Test City',
      country: 'Test Country',
      interests: 'HOT',
      employee_id: loginData.user.id // Use actual user ID
    };
    
    const response1 = await fetch(`${API_BASE_URL}/api/visitors`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${loginData.token}`
      },
      body: JSON.stringify(correctData)
    });
    
    const result1 = await response1.json();
    console.log('Correct ID Status:', response1.status);
    console.log('Correct ID Response:', JSON.stringify(result1, null, 2));
    
    // Test Case 2: Wrong employee ID
    console.log('\n2. Testing with WRONG employee ID...');
    const wrongData = {
      ...correctData,
      full_name: 'Test Visitor Wrong',
      email: 'wrong@test.com',
      phone: '7777777777',
      employee_id: 'wrong-employee-id-12345' // Invalid ID
    };
    
    const response2 = await fetch(`${API_BASE_URL}/api/visitors`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${loginData.token}`
      },
      body: JSON.stringify(wrongData)
    });
    
    const result2 = await response2.json();
    console.log('Wrong ID Status:', response2.status);
    console.log('Wrong ID Response:', JSON.stringify(result2, null, 2));
    
    // Test Case 3: No employee ID
    console.log('\n3. Testing with NO employee ID...');
    const noIdData = {
      ...correctData,
      full_name: 'Test Visitor No ID',
      email: 'noid@test.com',
      phone: '6666666666'
      // No employee_id field
    };
    
    const response3 = await fetch(`${API_BASE_URL}/api/visitors`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${loginData.token}`
      },
      body: JSON.stringify(noIdData)
    });
    
    const result3 = await response3.json();
    console.log('No ID Status:', response3.status);
    console.log('No ID Response:', JSON.stringify(result3, null, 2));
    
  } catch (error) {
    console.error('Test error:', error);
  }
}

testEmployeeId();
