
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

if (!supabaseUrl || !supabaseKey) {
    console.error('Error: Supabase environment variables missing. Found:', {
        url: supabaseUrl ? 'Found' : 'Missing',
        key: supabaseKey ? 'Found' : 'Missing'
    });
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkJob() {
    console.log('Searching for job "Zeladora / Limpeza" from "Grupo Service"...');

    const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .ilike('title', '%Zeladora%')
        .ilike('company', '%Grupo Service%');

    if (error) {
        console.error('Error fetching job:', error);
        return;
    }

    if (data && data.length > 0) {
        console.log('Found jobs:');
        data.forEach(job => {
            console.log(`ID: ${job.id}`);
            console.log(`Title: ${job.title}`);
            console.log(`Company: ${job.company}`);
            console.log(`Contact Link: ${job.contact_link}`);
            console.log('---');
        });
    } else {
        console.log('No matching job found.');
    }
}

checkJob();
