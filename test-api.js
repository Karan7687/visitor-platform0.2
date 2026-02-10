// Test API endpoints
const API_BASE_URL = 'https://visitor-platform.onrender.com';

async function testAPIs() {
  console.log('=== Testing APIs ===');
  
  // Test health endpoint
  try {
    const healthResponse = await fetch(`${API_BASE_URL}/health`);
    console.log('Health check:', healthResponse.status, healthResponse.ok);
    const healthData = await healthResponse.json();
    console.log('Health data:', healthData);
  } catch (error) {
    console.error('Health check failed:', error);
  }
  
  // Test companies endpoint
  try {
    const companiesResponse = await fetch(`${API_BASE_URL}/companies`);
    console.log('Companies check:', companiesResponse.status, companiesResponse.ok);
    const companiesData = await companiesResponse.json();
    console.log('Companies data:', companiesData);
  } catch (error) {
    console.error('Companies check failed:', error);
  }
  
  // Test visitor registration endpoint (with test data)
  try {
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
      employee_id: 'test123'
    };
    
    console.log('Testing visitor registration with data:', testVisitorData);
    
    const visitorResponse = await fetch(`${API_BASE_URL}/api/visitors`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Note: No token for this test
      },
      body: JSON.stringify(testVisitorData)
    });
    
    console.log('Visitor registration response:', visitorResponse.status, visitorResponse.ok);
    const visitorData = await visitorResponse.json();
    console.log('Visitor registration data:', visitorData);
    
  } catch (error) {
    console.error('Visitor registration failed:', error);
  }
}

testAPIs();
