// supabaseClient.js
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,           // <-- URL dal pannello Supabase
  process.env.SUPABASE_ANON_KEY            // <-- chiave presa dalle variabili d’ambiente
);

module.exports = supabase;
