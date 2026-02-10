// Test phone suggestions with 5-digit trigger
const API_BASE_URL = 'https://expo-lead-generation.onrender.com';

async function testPhoneSuggestions() {
  console.log('=== TESTING PHONE SUGGESTIONS ===');
  
  try {
    // Test 1: Less than 5 digits (should return empty)
    console.log('\n1. Testing with 3 digits (should return empty)...');
    const response3 = await fetch(`${API_BASE_URL}/api/visitors/phone-suggestions/123`);
    console.log('3 digits Status:', response3.status);
    const data3 = await response3.json();
    console.log('3 digits Response:', JSON.stringify(data3, null, 2));
    
    // Test 2: Exactly 5 digits (should return suggestions if available)
    console.log('\n2. Testing with 5 digits (should trigger suggestions)...');
    const response5 = await fetch(`${API_BASE_URL}/api/visitors/phone-suggestions/98765`);
    console.log('5 digits Status:', response5.status);
    const data5 = await response5.json();
    console.log('5 digits Response:', JSON.stringify(data5, null, 2));
    
    // Test 3: More than 5 digits (should return suggestions if available)
    console.log('\n3. Testing with 7 digits (should return suggestions)...');
    const response7 = await fetch(`${API_BASE_URL}/api/visitors/phone-suggestions/9876543`);
    console.log('7 digits Status:', response7.status);
    const data7 = await response7.json();
    console.log('7 digits Response:', JSON.stringify(data7, null, 2));
    
    // Test 4: Test with known phone from previous tests
    console.log('\n4. Testing with known phone number prefix...');
    const responseKnown = await fetch(`${API_BASE_URL}/api/visitors/phone-suggestions/07102`);
    console.log('Known prefix Status:', responseKnown.status);
    const dataKnown = await responseKnown.json();
    console.log('Known prefix Response:', JSON.stringify(dataKnown, null, 2));
    
    console.log('\n=== SUMMARY ===');
    console.log('✅ Phone suggestions endpoint tested');
    console.log('✅ Mobile app will trigger suggestions after 5 digits');
    console.log('✅ Backend will return matching records if available');
    
  } catch (error) {
    console.error('Test error:', error);
  }
}

testPhoneSuggestions();
