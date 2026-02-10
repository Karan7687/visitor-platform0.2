// Complete end-to-end test for expo-lead-generation backend
const API_BASE_URL = 'https://expo-lead-generation.onrender.com';

async function testCompleteFlow() {
  console.log('=== COMPLETE END-TO-END TEST ===');
  console.log('Backend:', API_BASE_URL);
  
  try {
    // Step 1: User Registration
    console.log('\n1. USER REGISTRATION');
    const newUser = {
      full_name: 'Complete Flow User',
      email: `complete${Date.now()}@test.com`,
      password: 'password123',
      company_code: 'FURNI123'
    };
    
    const registerResponse = await fetch(`${API_BASE_URL}/api/mobile/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newUser)
    });
    
    console.log('Register Status:', registerResponse.status);
    const registerData = await registerResponse.json();
    console.log('Register Response:', JSON.stringify(registerData, null, 2));
    
    if (!registerData.user?.id) {
      console.log('❌ Registration failed');
      return;
    }
    
    console.log('✅ User registered successfully');
    
    // Step 2: User Login
    console.log('\n2. USER LOGIN');
    const loginResponse = await fetch(`${API_BASE_URL}/api/mobile/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: newUser.email,
        password: newUser.password
      })
    });
    
    console.log('Login Status:', loginResponse.status);
    const loginData = await loginResponse.json();
    console.log('Login Response:', JSON.stringify(loginData, null, 2));
    
    if (!loginData.token) {
      console.log('❌ Login failed');
      return;
    }
    
    console.log('✅ User logged in successfully');
    console.log('User company_id:', loginData.user.company_id);
    
    // Step 3: Visitor Registration
    console.log('\n3. VISITOR REGISTRATION');
    const visitorData = {
      full_name: 'Complete Flow Visitor',
      email: `visitor${Date.now()}@test.com`,
      phone: `${Date.now().toString().slice(-10)}`,
      organization: 'Complete Flow Organization',
      designation: 'Complete Flow Designation',
      city: 'Complete Flow City',
      country: 'Complete Flow Country',
      interests: 'HOT',
      notes: 'Complete flow test notes',
      follow_up_date: '2026-02-15',
      employee_id: loginData.user.id,
      company_id: loginData.user.company_id // This should fix the issue
    };
    
    console.log('Visitor data being sent:', JSON.stringify(visitorData, null, 2));
    
    const visitorResponse = await fetch(`${API_BASE_URL}/api/visitors`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${loginData.token}`
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
    
    // Step 4: Phone Check
    console.log('\n4. PHONE CHECK');
    const phoneCheckResponse = await fetch(`${API_BASE_URL}/api/visitors/check-phone/${visitorData.phone}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${loginData.token}`
      }
    });
    
    console.log('Phone Check Status:', phoneCheckResponse.status);
    const phoneCheckResult = await phoneCheckResponse.json();
    console.log('Phone Check Response:', JSON.stringify(phoneCheckResult, null, 2));
    
    if (phoneCheckResponse.status === 200) {
      console.log('✅ Phone check works!');
    } else {
      console.log('❌ Phone check failed');
    }
    
    console.log('\n=== FINAL SUMMARY ===');
    console.log('✅ Backend:', API_BASE_URL);
    console.log('✅ User Registration:', registerData.user?.id ? 'WORKS' : 'FAILED');
    console.log('✅ User Login:', loginData.token ? 'WORKS' : 'FAILED');
    console.log('✅ Visitor Registration:', visitorResponse.status === 201 ? 'WORKS' : 'FAILED');
    console.log('✅ Phone Check:', phoneCheckResponse.status === 200 ? 'WORKS' : 'FAILED');
    
    if (registerData.user?.id && loginData.token && visitorResponse.status === 201) {
      console.log('\n🎉 ALL CORE FUNCTIONALITY WORKING! 🎉');
      console.log('✅ Sign in works');
      console.log('✅ Visitor registration works');
      console.log('✅ The app should work perfectly now!');
    } else {
      console.log('\n❌ Some issues still need to be resolved');
    }
    
  } catch (error) {
    console.error('Test error:', error);
  }
}

testCompleteFlow();
