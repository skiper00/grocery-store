import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://fiorkgrkzlhfxqvbobri.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZpb3JrZ3JremxoZnhxdmJvYnJpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDExOTY0MTcsImV4cCI6MjA1Njc3MjQxN30.cyEAMXVqkmnVJ0a8JdwkTpJ0vKRQx17T9svoA90_tAg'
const supabase = createClient(supabaseUrl, supabaseKey)

export {supabase}