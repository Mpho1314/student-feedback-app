import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv';

dotenv.config();

// Log to verify environment variables are loading
console.log('Supabase URL:', process.env.SUPABASE_URL ? 'Loaded' : 'Missing');
console.log('Supabase Key:', process.env.SUPABASE_SERVICE_KEY ? 'Loaded' : 'Missing');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY; // Use SERVICE ROLE key, not anon key

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables');
}

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

export default supabase;
