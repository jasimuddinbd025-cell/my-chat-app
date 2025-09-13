import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://gouoasvmrmyoqngkqznu.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdvdW9hc3Ztcm15b3FuZ2txem51Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc2NjQ3MTEsImV4cCI6MjA3MzI0MDcxMX0.wuUo5-n-RQxLda_4muc6ioM6mvlnQlg6H3hWM_Tnf3A';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
