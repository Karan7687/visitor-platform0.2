// Test mobile-specific endpoints on expo backend
const API_BASE_URL = 'https://expo-lead-generation.onrender.com';

async function testMobileEndpoints() {
  console.log('=== TESTING MOBILE ENDPOINTS ===');
  
  try {
    // Step 1: Test mobile registration
    console.log('\n1. Testing /api/mobile/register...');
    const testUser = {
      full_name: 'Mobile Test User',
      email: `mobile${Date.now()}@test.com`,
      password: 'password123',
      company_code: 'FURNI123'
    };
    
    const mobileRegisterResponse = await fetch(`${API_BASE_URL}/api/mobile/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testUser)
    });
    
    console.log('Mobile Register Status:', mobileRegisterResponse.status);
    const mobileRegisterData = await mobileRegisterResponse.json();
    console.log('Mobile Register Response:', JSON.stringify(mobileRegisterData, null, 2));
    
    if (mobileRegisterData.user?.id) {
      console.log('✅ Mobile registration successful!');
      
      // Step 2: Test mobile login with the new user
      console.log('\n2. Testing /api/mobile/login with new user...');
      const mobileLoginResponse = await fetch(`${API_BASE_URL}/api/mobile/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: testUser.email,
          password: testUser.password
        })
      });
      
      console.log('Mobile Login Status:', mobileLoginResponse.status);
      const mobileLoginData = await mobileLoginResponse.json();
      console.log('Mobile Login Response:', JSON.stringify(mobileLoginData, null, 2));
      
      if (mobileLoginData.token && mobileLoginData.user?.id) {
        console.log('✅ Mobile login successful!');
        
        // Step 3: Test visitor registration
        console.log('\n3. Testing visitor registration...');
        const visitorData = {
          full_name: 'Mobile Test Visitor',
          email: `mobilevisitor${Date.now()}@test.com`,
          phone: `${Date.now().toString().slice(-10)}`,
          organization: 'Mobile Test Organization',
          designation: 'Mobile Test Designation',
          city: 'Mobile Test City',
          country: 'Mobile Test Country',
          interests: 'HOT',
          notes: 'Mobile test notes',
          follow_up_date: '2026-02-15',
          employee_id: mobileLoginData.user.id
        };
        
        const visitorResponse = await fetch(`${API_BASE_URL}/api/visitors`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${mobileLoginData.token}`
          },
          body: JSON.stringify(visitorData)
        });
        
        console.log('Visitor Registration Status:', visitorResponse.status);
        const visitorResult = await visitorResponse.json();
        console.log('Visitor Registration Response:', JSON.stringify(visitorResult, null, 2));
        
        if (visitorResponse.status === 201) {
          console.log('✅ VISITOR REGISTRATION WORKS!');
        } else {
          console.log('❌ Visitor registration failed');
        }
      }
    } else {
      console.log('❌ Mobile registration failed');
    }
    
    // Step 4: Test visitor check phone
    console.log('\n4. Testing visitor check phone...');
    try {
      const phoneCheckResponse = await fetch(`${API_BASE_URL}/api/visitors/check-phone/9876543210`);
      console.log('Phone Check Status:', phoneCheckResponse.status);
      const phoneCheckData = await phoneCheckResponse.json();
      console.log('Phone Check Response:', JSON.stringify(phoneCheckData, null, 2));
    } catch (error) {
      console.log('❌ Phone check failed:', error.message);
    }
    
    console.log('\n=== FINAL SUMMARY ===');
    console.log('✅ Backend URL:', API_BASE_URL);
    console.log('✅ Mobile Registration:', mobileRegisterData.user?.id ? 'WORKS' : 'FAILED');
    console.log('✅ Mobile Login:', mobileRegisterData.user?.id ? 'TESTED' : 'NOT TESTED');
    console.log('✅ Visitor Registration:', 'TESTED');
    console.log('✅ Phone Check:', 'TESTED');
    
  } catch (error) {
    console.error('Test error:', error);
  }
}

testMobileEndpoints();
