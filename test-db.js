const pool = require('./db');

(async () => {
    try {
        const res = await pool.query('SELECT NOW()');
        console.log('Connection successful:', res.rows[0]);
        pool.end();
    } catch (err) {
        console.error('Error connecting to the database:', err.message);
    }
})();
