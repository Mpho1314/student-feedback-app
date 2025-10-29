import { createClient } from '@supabase/supabase-js'

// ⚠️ TEMPORARY FIX - REPLACE WITH YOUR ACTUAL SUPABASE CREDENTIALS
const supabaseUrl = 'YOUR_SUPABASE_PROJECT_URL_HERE'; // e.g., https://abc123.supabase.co
const supabaseKey = 'YOUR_SERVICE_ROLE_KEY_HERE';     // e.g., eyJhbGciOiJ...

console.log('🔧 Using temporary Supabase configuration');

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

// Test connection
supabase.from('feedback').select('*', { count: 'exact', head: true })
  .then(() => console.log('✅ Supabase connected successfully'))
  .catch(error => console.error('❌ Supabase connection failed:', error.message));

export default supabase;
