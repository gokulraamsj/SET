import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://etfpyfnotpnbyjdrtucs.supabase.co";
const supabaseAnonKey = "sb_publishable_LYjKoJ_DQt5b258j6f8oFA_vJJfuZkb";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);