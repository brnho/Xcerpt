// supabase password: nan2rxxuZBvbpMfO
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import 'react-native-url-polyfill/auto';

const supabaseUrl = 'https://ikhkbulgpvkpognzoxax.supabase.co';
// key should be private, but assume that it can leak
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlraGtidWxncHZrcG9nbnpveGF4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzAyOTMyMjEsImV4cCI6MTk4NTg2OTIyMX0.27CpCtWzydL3KDmpLhsejQv706YdAeRqFKE9z1tStkA';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
        storage: AsyncStorage,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl:  false,
    }
});