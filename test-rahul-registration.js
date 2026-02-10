// Test registering Rahul Sharma (existing visitor) again
const API_BASE_URL = 'https://expo-lead-generation.onrender.com';

async function testRahulRegistration() {
  console.log('=== TESTING RAHUL SHARMA REGISTRATION ===');
  
  try {
    // Login to get token
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
    
    // Test Case: Register Rahul Sharma again (exact same data)
    console.log('\n1. Testing Rahul Sharma registration (existing visitor)...');
    const rahulData = {
      full_name: 'Rahul Sharma',
      email: 'rahul.sharma@gmail.com',
      phone: '9876543210',
      organization: 'ABC Pvt Ltd',
      designation: 'Software Engineer',
      city: 'Pune',
      country: 'India',
      interests: 'HOT',
      employee_id: 'ae84638c-9b41-4a35-a9a1-b3f5c5b2fa9d'
    };
    
    const response = await fetch(`${API_BASE_URL}/api/visitors`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${loginData.token}`
      },
      body: JSON.stringify(rahulData)
    });
    
    const result = await response.json();
    console.log('Rahul Registration Status:', response.status);
    console.log('Rahul Registration Response:', JSON.stringify(result, null, 2));
    
    // Test Case: What if we allow re-registration?
    console.log('\n2. Discussion: What should happen on re-registration?');
    console.log('Current behavior: 409 Conflict - "Visitor with this phone number already exists"');
    console.log('Expected behavior (per your app): Allow re-registration');
    console.log('Possible solutions:');
    console.log('  1. Backend should UPDATE existing visitor instead of rejecting');
    console.log('  2. Backend should allow duplicate registrations with new IDs');
    console.log('  3. Backend should create new visit records for existing visitors');
    
  } catch (error) {
    console.error('Test error:', error);
  }
}

testRahulRegistration();
