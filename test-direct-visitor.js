// Test visitor registration with hardcoded token
const API_BASE_URL = 'http://localhost:3000';

async function testDirectVisitor() {
  console.log('=== Testing Direct Visitor Registration ===');
  
  // Test visitor registration with hardcoded token
  const testVisitorData = {
    full_name: 'Test User',
    email: 'test@example.com',
    phone: '1234567890',
    organization: 'Test Org',
    designation: 'Test Role',
    city: 'Test City',
    country: 'Test Country',
    interests: 'HOT',
    notes: 'Test notes',
    follow_up_date: '2026-02-10',
    employee_id: 'test-user-id'
  };
  
  // Generate a test JWT token
  const jwt = require('jsonwebtoken');
  const testToken = jwt.sign(
    { userId: 'test-user-id', email: 'test@example.com', role: 'employee' },
    'test-secret-key',
    { expiresIn: '24h' }
  );
  
  console.log('Generated test token:', testToken.substring(0, 20) + '...');
  
  try {
    const visitorResponse = await fetch(`${API_BASE_URL}/api/visitors`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${testToken}`
      },
      body: JSON.stringify(testVisitorData)
    });
    
    console.log('Visitor registration response:', visitorResponse.status, visitorResponse.ok);
    const visitorData = await visitorResponse.json();
    console.log('Visitor registration data:', visitorData);
    
  } catch (error) {
    console.error('Test failed:', error);
  }
}

testDirectVisitor();
