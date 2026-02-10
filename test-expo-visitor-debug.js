// Debug visitor registration on expo backend specifically
const API_BASE_URL = 'https://expo-lead-generation.onrender.com';

async function debugExpoVisitor() {
  console.log('=== DEBUGGING EXPO VISITOR REGISTRATION ===');
  
  try {
    // Step 1: Login to get token
    console.log('\n1. Getting login token...');
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
      console.log('❌ No token received');
      return;
    }
    
    console.log('✅ Login successful');
    console.log('User data:', JSON.stringify(loginData.user, null, 2));
    
    // Step 2: Test visitor registration with detailed debugging
    console.log('\n2. Testing visitor registration with debug info...');
    
    const visitorData = {
      full_name: 'Debug Test Visitor',
      email: `debug${Date.now()}@test.com`,
      phone: `${Date.now().toString().slice(-10)}`,
      organization: 'Debug Test Organization',
      designation: 'Debug Test Designation',
      city: 'Debug Test City',
      country: 'Debug Test Country',
      interests: 'HOT',
      notes: 'Debug test notes',
      follow_up_date: '2026-02-15',
      employee_id: loginData.user.id,
      company_id: loginData.user.company_id
    };
    
    console.log('Visitor data being sent:', JSON.stringify(visitorData, null, 2));
    console.log('Request headers:', {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${loginData.token.substring(0, 50)}...`
    });
    
    const visitorResponse = await fetch(`${API_BASE_URL}/api/visitors`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${loginData.token}`
      },
      body: JSON.stringify(visitorData)
    });
    
    console.log('\n--- RESPONSE ANALYSIS ---');
    console.log('Status:', visitorResponse.status);
    console.log('Headers:', Object.fromEntries(visitorResponse.headers.entries()));
    
    const responseText = await visitorResponse.text();
    console.log('Raw Response:', responseText);
    
    try {
      const jsonResponse = JSON.parse(responseText);
      console.log('Parsed JSON:', JSON.stringify(jsonResponse, null, 2));
      
      if (jsonResponse.error === "Company ID is required") {
        console.log('\n🔍 ANALYSIS: Backend receives request but still says "Company ID is required"');
        console.log('🔍 This suggests:');
        console.log('   1. Backend code is different from visitor-platform backend');
        console.log('   2. Backend expects company_id in a different format/location');
        console.log('   3. Backend has a bug in company ID validation');
      }
    } catch (parseError) {
      console.log('Failed to parse JSON:', parseError.message);
    }
    
    // Step 3: Try without company_id to see exact error
    console.log('\n3. Testing without company_id to compare...');
    const visitorDataNoCompany = {
      full_name: 'No Company Test',
      email: `nocompany${Date.now()}@test.com`,
      phone: `${Date.now().toString().slice(-10)}`,
      employee_id: loginData.user.id
      // No company_id field
    };
    
    const noCompanyResponse = await fetch(`${API_BASE_URL}/api/visitors`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${loginData.token}`
      },
      body: JSON.stringify(visitorDataNoCompany)
    });
    
    console.log('No Company Response Status:', noCompanyResponse.status);
    const noCompanyResult = await noCompanyResponse.json();
    console.log('No Company Response:', JSON.stringify(noCompanyResult, null, 2));
    
  } catch (error) {
    console.error('Debug error:', error);
  }
}

debugExpoVisitor();
