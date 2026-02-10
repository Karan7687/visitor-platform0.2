// Test JWT generation
const jwt = require('jsonwebtoken');

// Test token generation
const testPayload = { userId: 'test-id', email: 'test@example.com', role: 'employee' };
const token = jwt.sign(
  testPayload,
  'test-secret-key',
  { expiresIn: '24h' }
);

console.log('Generated token:', token);
console.log('Token length:', token.length);

// Test token verification
const decoded = jwt.verify(token, 'test-secret-key');
console.log('Decoded token:', decoded);
