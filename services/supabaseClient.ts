import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://hegadwldpjjzucdqcymi.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhlZ2Fkd2xkcGpqenVjZHFjeW1pIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUyODQ3MzYsImV4cCI6MjA4MDg2MDczNn0.VqT6IgJtoRxSUh8gB2Cf_ggvpQKDbRlh9nrIthMqQSI';

export const supabase = createClient(supabaseUrl, supabaseKey);
