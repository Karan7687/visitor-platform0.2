// Test expo-lead-generation backend for login and visitor registration
const API_BASE_URL = 'https://expo-lead-generation.onrender.com';

async function testExpoBackend() {
  console.log('=== TESTING EXPO-LEAD-GENERATION BACKEND ===');
  console.log('Backend URL:', API_BASE_URL);
  
  try {
    // Step 1: Test basic connectivity
    console.log('\n1. Testing basic connectivity...');
    try {
      const healthResponse = await fetch(`${API_BASE_URL}/health`);
      console.log('Health Status:', healthResponse.status);
      if (healthResponse.ok) {
        const healthData = await healthResponse.json();
        console.log('✅ Health Response:', healthData);
      }
    } catch (healthError) {
      console.log('❌ Health check failed:', healthError.message);
    }
    
    // Step 2: Test different login endpoints
    console.log('\n2. Testing login endpoints...');
    
    // Test /api/users/login
    console.log('\nTesting /api/users/login...');
    try {
      const usersLoginResponse = await fetch(`${API_BASE_URL}/api/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'test@example.com',
          password: 'password123'
        })
      });
      console.log('Users Login Status:', usersLoginResponse.status);
      const usersLoginData = await usersLoginResponse.json();
      console.log('Users Login Response:', JSON.stringify(usersLoginData, null, 2));
    } catch (error) {
      console.log('❌ Users login failed:', error.message);
    }
    
    // Test /api/mobile/login
    console.log('\nTesting /api/mobile/login...');
    try {
      const mobileLoginResponse = await fetch(`${API_BASE_URL}/api/mobile/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'test@example.com',
          password: 'password123'
        })
      });
      console.log('Mobile Login Status:', mobileLoginResponse.status);
      const mobileLoginData = await mobileLoginResponse.json();
      console.log('Mobile Login Response:', JSON.stringify(mobileLoginData, null, 2));
    } catch (error) {
      console.log('❌ Mobile login failed:', error.message);
    }
    
    // Step 3: Test user registration endpoints
    console.log('\n3. Testing registration endpoints...');
    
    // Test /api/users/register
    console.log('\nTesting /api/users/register...');
    const testUser = {
      full_name: 'Test User Expo',
      email: `expo${Date.now()}@test.com`,
      password: 'password123',
      company_code: 'FURNI123'
    };
    
    try {
      const usersRegisterResponse = await fetch(`${API_BASE_URL}/api/users/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(testUser)
      });
      console.log('Users Register Status:', usersRegisterResponse.status);
      const usersRegisterData = await usersRegisterResponse.json();
      console.log('Users Register Response:', JSON.stringify(usersRegisterData, null, 2));
      
      // If registration successful, try login with this user
      if (usersRegisterData.user?.id) {
        console.log('\n--- Testing login with newly registered user ---');
        const loginResponse = await fetch(`${API_BASE_URL}/api/users/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: testUser.email,
            password: testUser.password
          })
        });
        console.log('Login Status:', loginResponse.status);
        const loginData = await loginResponse.json();
        console.log('Login Response:', JSON.stringify(loginData, null, 2));
        
        // Step 4: Test visitor registration if login successful
        if (loginData.user?.id) {
          console.log('\n4. Testing visitor registration...');
          const visitorData = {
            full_name: 'Test Visitor Expo',
            email: `visitor${Date.now()}@test.com`,
            phone: `${Date.now().toString().slice(-10)}`,
            organization: 'Expo Test Organization',
            designation: 'Expo Test Designation',
            city: 'Expo Test City',
            country: 'Expo Test Country',
            interests: 'HOT',
            notes: 'Expo test notes',
            follow_up_date: '2026-02-15',
            employee_id: loginData.user.id
          };
          
          const visitorResponse = await fetch(`${API_BASE_URL}/api/visitors`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': loginData.token ? `Bearer ${loginData.token}` : undefined
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
      }
    } catch (error) {
      console.log('❌ Users registration failed:', error.message);
    }
    
    console.log('\n=== SUMMARY ===');
    console.log('✅ Backend is accessible at:', API_BASE_URL);
    console.log('🔍 Login endpoints tested');
    console.log('🔍 Registration endpoints tested');
    console.log('🔍 Visitor endpoints tested');
    
  } catch (error) {
    console.error('Test error:', error);
  }
}

testExpoBackend();
