// Test registration without notes field
const API_BASE_URL = 'https://expo-lead-generation.onrender.com';

async function testWithoutNotes() {
  console.log('=== TESTING WITHOUT NOTES FIELD ===');
  
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
    
    // Test without notes field
    const dataWithoutNotes = {
      full_name: 'Test Visitor',
      email: 'test@visitor.com',
      phone: '9876543210',
      organization: 'Test Org',
      designation: 'Test Role',
      city: 'Test City',
      country: 'Test Country',
      interests: 'HOT',
      follow_up_date: '2026-02-10',
      employee_id: 'ae84638c-9b41-4a35-a9a1-b3f5c5b2fa9d'
    };
    
    console.log('\nTesting without notes field...');
    const response = await fetch(`${API_BASE_URL}/api/visitors`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${loginData.token}`
      },
      body: JSON.stringify(dataWithoutNotes)
    });
    
    const responseData = await response.json();
    console.log('Status:', response.status);
    console.log('Response:', JSON.stringify(responseData, null, 2));
    
    if (response.status === 201) {
      console.log('✅ SUCCESS: Registration worked without notes!');
    } else {
      console.log('❌ FAILED: Still validation error');
    }
    
  } catch (error) {
    console.error('Test error:', error);
  }
}

testWithoutNotes();
