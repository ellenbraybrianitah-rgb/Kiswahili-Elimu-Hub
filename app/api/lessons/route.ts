import { createClient } from '@supabase/supabase-js';
import type { NextApiRequest, NextApiResponse } from 'next';

const supabase = createClient('your-supabase-url', 'your-supabase-anon-key');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    // Handle GET request
    const { data, error } = await supabase
      .from('lessons')
      .select('*');

    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json(data);
  } else if (req.method === 'POST') {
    // Handle POST request
    const { title, content } = req.body;
    const { data, error } = await supabase
      .from('lessons')
      .insert([{ title, content }]);

    if (error) return res.status(500).json({ error: error.message });
    return res.status(201).json(data);
  } else {
    // Method Not Allowed
    return res.status(405).json({ message: 'Method not allowed' });
  }
}