// Test Render backend health
const API_BASE_URL = 'https://visitor-platform.onrender.com';

async function testRenderHealth() {
  try {
    console.log('Testing Render backend health...');
    const response = await fetch(`${API_BASE_URL}/health`);
    console.log('Health response:', response.status, response.ok);
    const data = await response.json();
    console.log('Health data:', data);
  } catch (error) {
    console.error('Render backend health check failed:', error);
  }
}

testRenderHealth();
