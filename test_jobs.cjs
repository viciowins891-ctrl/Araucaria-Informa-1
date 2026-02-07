const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

// Load .env manually
const envPath = path.join(__dirname, '.env');
const envContent = fs.readFileSync(envPath, 'utf-8');

const env = {};
envContent.split('\n').forEach(line => {
    const [key, value] = line.split('=');
    if (key && value) {
        env[key.trim()] = value.trim();
    }
});

const url = env['VITE_SupabaseUrl'];
const key = env['VITE_SupabaseKey'];

if (!url || !key) {
    console.error('ERROR: Missing Supabase URL or Key in .env');
    process.exit(1);
}

console.log('Connecting to:', url);

const supabase = createClient(url, key);

async function testJobs() {
    const { data, error } = await supabase
        .from('jobs')
        .select('*');

    if (error) {
        console.error('ERROR Fetching Jobs:', error);
    } else {
        console.log('SUCCESS! Found jobs:', data.length);
        if (data.length > 0) {
            console.log('First Job:', data[0].title);
            console.log('Link:', data[0].contact_link);
        } else {
            console.log('WARNING: Job table is empty.');
        }
    }
}

testJobs();
