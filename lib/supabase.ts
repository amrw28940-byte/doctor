import { createClient } from '@supabase/supabase-js';

// رابط مشروعك (تأكد أنه كما هو)
const supabaseUrl = 'https://vtnzkhwxklxelgisqznt.supabase.co';

// المفتاح العام (Publishable Key) الذي أرسلته أنت
const supabaseKey = 'sb_publishable_POmP-HUR23DvJ7flwtbK1w_D8TV76jn';

export const supabase = createClient(supabaseUrl, supabaseKey);