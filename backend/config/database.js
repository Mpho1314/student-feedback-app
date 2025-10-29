import { createClient } from '@supabase/supabase-js'

// ⚠️ REPLACE THESE PLACEHOLDERS WITH YOUR ACTUAL CREDENTIALS ⚠️
const supabaseUrl = 'https://bslaqbnbwulmpbsxpcju.supabase.co'; // YOUR REAL PROJECT URL
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJzbGFxYm5id3VsbXBic3hwY2p1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MTcwMDcwOSwiZXhwIjoyMDc3Mjc2NzA5fQ.btTCf_tMoGbX5w7JVmU-peHUUsOs4oCGiIid9fgx0uE'; // YOUR REAL SERVICE ROLE KEY

console.log('🔧 Using Supabase configuration');

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
