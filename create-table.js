const pool = require('./db');

(async () => {
    try {
        const query = `
            CREATE TABLE items (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                description TEXT
            );
        `;
        await pool.query(query);
        console.log('Table created successfully!');
    } catch (err) {
        console.error('Error creating table:', err.message);
    } finally {
        pool.end(); // Close the connection pool
    }
})();
