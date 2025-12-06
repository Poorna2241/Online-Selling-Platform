// src/pages/SignUp.jsx
import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function SignUp() {
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [fullName,setFullName] = useState('');
  const [role,setRole] = useState('buyer'); // buyer or seller

  const handleSignup = async () => {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) return alert(error.message);

    const user = data.user ?? (await supabase.auth.getUser()).data.user;
    // update profile row with chosen role and full name
    await supabase.from('user_profiles').upsert({
      id: user.id,
      email,
      full_name: fullName,
      role
    });
    alert('Check your email to confirm (if email confirm enabled).');
  };

  return (
    <div>
      <input placeholder="Full name" onChange={e=>setFullName(e.target.value)} />
      <input placeholder="Email" onChange={e=>setEmail(e.target.value)} />
      <input placeholder="Password" type="password" onChange={e=>setPassword(e.target.value)} />
      <select onChange={e=>setRole(e.target.value)}>
        <option value="buyer">Buyer</option>
        <option value="seller">Seller</option>
      </select>
      <button onClick={handleSignup}>Sign up</button>
    </div>
  );
}
