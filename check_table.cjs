
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

try {
    const envFile = fs.readFileSync(path.resolve(__dirname, '.env.local'), 'utf-8');
    const lines = envFile.split('\n');
    lines.forEach(line => {
        const [key, value] = line.split('=');
        if (key && value) {
            process.env[key.trim()] = value.trim();
        }
    });
} catch (e) {
    console.error('Error reading .env.local:', e);
}

const supabaseUrl = process.env.VITE_SupabaseUrl;
const supabaseKey = process.env.VITE_SupabaseKey;

const supabase = createClient(supabaseUrl, supabaseKey);

async function listTables() {
    console.log('List tables...');
    // There isn't a direct "list tables" in JS client easily without rpc call or inspection, 
    // but we can try to select from a known table or just try 'public.jobs_v2' or something.
    // Let's just try to read from 'jobs' again, maybe I made a typo before? No.
    // Let's try to query information_schema if enabled, or just try to insert a dummy to see error.

    // Better yet, let's look at the codebase again.
    // In `services/JobsService.ts`: 
    // const { error } = await supabase.from('jobs').insert({...})
    // It uses 'jobs'.

    // Maybe the table is not created yet?
    // Let's check if 'setup_jobs.sql' was ever run.

    // I will try to select count from 'jobs'.
    const { count, error } = await supabase.from('jobs').select('*', { count: 'exact', head: true });

    if (error) {
        console.log('Error accessing "jobs" table:', error);
    } else {
        console.log('Table "jobs" exists. Count:', count);
    }
}

listTables();
