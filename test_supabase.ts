
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

// Manually load .env.local because dotenv doesn't do it automatically in a simple script sometimes without config
const envLocalPath = path.resolve(process.cwd(), '.env.local');
if (fs.existsSync(envLocalPath)) {
    const envConfig = dotenv.parse(fs.readFileSync(envLocalPath));
    for (const k in envConfig) {
        process.env[k] = envConfig[k];
    }
}

const supabaseUrl = process.env.VITE_SupabaseUrl;
const supabaseKey = process.env.VITE_SupabaseKey;

console.log('Testing Supabase Connection...');
console.log('URL:', supabaseUrl);
console.log('Key (first 10 chars):', supabaseKey ? supabaseKey.substring(0, 10) : 'MISSING');

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase credentials!');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
    try {
        const { data, error } = await supabase.from('news').select('id, title, publish_date').limit(10).order('publish_date', { ascending: false });

        if (error) {
            console.error('Supabase Error:', error.message);
        } else {
            console.log('Success! Found ' + data.length + ' articles.');
            data.forEach(n => {
                console.log(`[${n.publish_date}] ${n.title}`);
            });
        }
    } catch (err) {
        console.error('Unexpected Error:', err);
    }
}

testConnection();
