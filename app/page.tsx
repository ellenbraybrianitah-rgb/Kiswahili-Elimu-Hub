import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

// Supabase client initialization
const supabase = createClient('YOUR_SUPABASE_URL', 'YOUR_SUPABASE_ANON_KEY');

const LoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const { error } = await supabase.auth.signIn({ email, password });
    if (!error) {
      onLogin();
    } else {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

const Dashboard = ({ user }) => {
  return (
    <div>
      <h2>Welcome, {user.email}</h2>
      <p>This is your AI Tutor Chat Interface.</p>
      {/* AI chat interface goes here */}
    </div>
  );
};

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const session = supabase.auth.session();
    setUser(session?.user);

    const { data: authListener } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user);
    });

    return () => {
      authListener.unsubscribe();
    };
  }, []);

  return (
    <div>
      {user ? <Dashboard user={user} /> : <LoginPage onLogin={() => setUser(supabase.auth.user())} />}
    </div>
  );
};

export default App;