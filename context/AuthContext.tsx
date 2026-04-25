import React, { createContext, useContext, useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'YOUR_SUPABASE_URL';
const supabaseAnonKey = 'YOUR_SUPABASE_ANON_KEY';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const session = supabase.auth.session();
        setUser(session ? session.user : null);
        setLoading(false);

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
            setUser(session ? session.user : null);
        });

        return () => subscription.unsubscribe();
    }, []);

    const signup = async (email, password) => {
        const { user, error } = await supabase.auth.signUp({ email, password });
        return { user, error };
    };

    const signin = async (email, password) => {
        const { user, error } = await supabase.auth.signIn({ email, password });
        return { user, error };
    };

    const signout = async () => {
        const { error } = await supabase.auth.signOut();
        return { error };
    };

    return (
        <AuthContext.Provider value={{ user, signup, signin, signout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);