const pool = require('./db');

async function checkUsers() {
  try {
    console.log('Checking all users in database...');
    const result = await pool.query('SELECT id, full_name, email, company_id FROM users ORDER BY id');
    
    console.log('All users in database:');
    result.rows.forEach(user => {
      console.log(`ID: ${user.id}, Name: ${user.full_name}, Email: ${user.email}, Company ID: ${user.company_id}`);
    });
    
    process.exit(0);
  } catch (err) {
    console.error('Error:', err);
    process.exit(1);
  }
}

checkUsers();
