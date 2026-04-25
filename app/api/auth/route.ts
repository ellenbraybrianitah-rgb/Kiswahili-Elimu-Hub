import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://YOUR_SUPABASE_URL';
const supabaseKey = 'YOUR_SUPABASE_KEY';
const supabase = createClient(supabaseUrl, supabaseKey);

// User signup function
export const signup = async (email, password) => {
    const { user, error } = await supabase.auth.signUp({
        email,
        password,
    });
    return { user, error };
};

// User login function
export const login = async (email, password) => {
    const { user, error } = await supabase.auth.signIn({
        email,
        password,
    });
    return { user, error };
};

// User logout function
export const logout = async () => {
    const { error } = await supabase.auth.signOut();
    return { error };
};
