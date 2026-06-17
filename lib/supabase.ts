import { createClient as createSupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://vtnzkhwxklxelgisqznt.supabase.co';
const supabaseKey = 'sb_publishable_POmP-HUR23DvJ7flwtbK1w_D8TV76jn';

// نستخدم دالة لإنشاء العميل لضمان عدم حدوث تداخل في الذاكرة
export const createClient = () => {
  return createSupabaseClient(supabaseUrl, supabaseKey);
};