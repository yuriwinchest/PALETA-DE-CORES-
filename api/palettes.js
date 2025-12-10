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
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, x-user-id');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    const userId = req.headers['x-user-id'];

    if (!userId) {
        return res.status(401).json({ error: 'Missing x-user-id header' });
    }

    try {
        if (req.method === 'GET') {
            const { rows } = await pool.query('SELECT * FROM palettes WHERE user_id = $1 ORDER BY created_at DESC', [userId]);
            return res.status(200).json(rows);
        }

        if (req.method === 'POST') {
            const { name, colors, description, id } = req.body;

            if (id) {
                // Update
                await pool.query('UPDATE palettes SET name=$1, colors=$2, description=$3 WHERE id=$4 AND user_id=$5', [name, JSON.stringify(colors), description, id, userId]);
                return res.status(200).json({ success: true, id });
            } else {
                // Insert
                const { rows } = await pool.query('INSERT INTO palettes (user_id, name, colors, description) VALUES ($1, $2, $3, $4) RETURNING *', [userId, name, JSON.stringify(colors), description]);
                return res.status(200).json(rows);
            }
        }

        if (req.method === 'DELETE') {
            const { id } = req.query;
            if (!id) return res.status(400).json({ error: "Missing id" });

            await pool.query('DELETE FROM palettes WHERE id=$1 AND user_id=$2', [id, userId]);
            return res.status(200).json({ success: true });
        }

        res.status(404).json({ error: 'Method not allowed' });
    } catch (error) {
        console.error('Database Error:', error);
        res.status(500).json({ error: error.message });
    }
}
