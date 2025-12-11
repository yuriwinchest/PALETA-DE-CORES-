import { Pool } from '@neondatabase/serverless';

export default async function handler(req, res) {
    const connectionString = process.env.DATABASE_URL;

    if (!connectionString) {
        return res.status(500).json({ error: 'DATABASE_URL not configured' });
    }

    const pool = new Pool({ connectionString });

    // CORS config
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, x-user-id');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method === 'POST') {
        const { id, email } = req.body;

        if (!id || !email) {
            return res.status(400).json({ error: 'Missing id or email' });
        }

        try {
            // Upsert user (insert if not exists, do nothing if exists)
            await pool.query(
                'INSERT INTO users (id, email) VALUES ($1, $2) ON CONFLICT (id) DO NOTHING',
                [id, email]
            );
            return res.status(200).json({ success: true });
        } catch (error) {
            console.error('Database Error:', error);
            return res.status(500).json({ error: error.message });
        }
    }

    res.status(404).json({ error: 'Method not allowed' });
}
