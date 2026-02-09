const { Pool } = require('pg');

// Use environment variable for database connection
const connectionString = process.env.DATABASE_URL || 'postgresql://expo_admin:ILK9Pxsl31jPSZxi7ojw7LZ3qk4pSXsV@dpg-d5md7k14tr6s73cifjmg-a.virginia-postgres.render.com/expo_event_db';

console.log('=== DATABASE CONNECTION DEBUG ===');
console.log('Connection String:', connectionString.replace(/:[^:]*@/, ':***@')); // Hide password
console.log('===============================');

const pool = new Pool({
  connectionString: connectionString,
  ssl: {
    rejectUnauthorized: false
  },
  max: 10,
  connectionTimeoutMillis: 10000,
  idleTimeoutMillis: 30000,
});

pool.on('connect', () => {
  console.log('✅ Connected to PostgreSQL database');
});

pool.on('error', (err) => {
  console.error('❌ PostgreSQL connection error:', err.message);
});

// Test connection with retry logic
const testConnection = async (retries = 3) => {
  for (let i = 0; i < retries; i++) {
    try {
      const result = await pool.query('SELECT NOW() as current_time, current_database() as database');
      console.log('🎯 Database test successful!');
      console.log('⏰ Current time:', result.rows[0].current_time);
      console.log('💾 Connected to database:', result.rows[0].database);
      return true;
    } catch (err) {
      console.error(`❌ Database test failed (attempt ${i + 1}/${retries}):`, err.message);
      if (i < retries - 1) {
        console.log('⏳ Retrying in 2 seconds...');
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    }
  }
  return false;
};

// Test connection asynchronously
testConnection();

module.exports = pool;
