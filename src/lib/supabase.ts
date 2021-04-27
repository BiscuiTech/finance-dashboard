import { createClient } from '@supabase/supabase-js';

const supabase = createClient('https://vznxarbhhgkyuznjgisd.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYxNTE2MjU4OSwiZXhwIjoxOTMwNzM4NTg5fQ.apr6fNS4ucGYDBlVEfxU_4UV3CFh7mBee7vUsA-SCjU');

export default supabase;