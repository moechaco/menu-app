import { createClient } from "@supabase/supabase-js";

const supabaseUrl = 'https://besatxrhunjyerxovthi.supabase.co'
const supabaseAnonKey = 'sb_publishable_vBBczclFhL9TkMXSXy2uzg_wk3fp6dL'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)