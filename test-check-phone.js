// Test CHECK_PHONE endpoint to see what data it returns
const API_BASE_URL = 'https://visitor-platform.onrender.com';

async function testCheckPhone() {
  console.log('=== TESTING CHECK_PHONE ENDPOINT ===');
  
  try {
    // Test with a phone number that might exist
    const testPhone = '9876543210';
    const url = `${API_BASE_URL}/api/visitors/check-phone/${testPhone}`;
    
    console.log('Testing URL:', url);
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    console.log('Response status:', response.status);
    console.log('Response ok:', response.ok);
    
    const data = await response.json();
    console.log('Response data:', JSON.stringify(data, null, 2));
    
    if (data.visitor) {
      console.log('✅ Visitor data available for auto-fill');
      console.log('Available fields:', Object.keys(data.visitor));
    } else {
      console.log('❌ No visitor data returned - auto-fill will use fallback');
    }
    
  } catch (error) {
    console.error('Test error:', error);
  }
}

testCheckPhone();
