import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getSupabaseClient } from '@/lib/supabaseClient';

export function SignUpPage(): JSX.Element {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const supabase = getSupabaseClient();
      const { data, error: signUpError } = await supabase.auth.signUp({ email, password, options: { data: { first_name: firstName, last_name: lastName, company } } });
      if (signUpError) {
        throw signUpError;
      }
      if (!data.user) {
        throw new Error('Failed to create user');
      }
      navigate('/signin');
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white rounded-lg shadow p-6 space-y-4">
        <h1 className="text-xl font-semibold">Create account</h1>
        {error && <div className="text-sm text-red-600">{error}</div>}
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <label htmlFor="firstName" className="text-sm font-medium">First name</label>
            <input id="firstName" value={firstName} onChange={function(e){ setFirstName(e.target.value); }} className="w-full rounded-md border px-3 py-2" required />
          </div>
          <div className="space-y-1">
            <label htmlFor="lastName" className="text-sm font-medium">Last name</label>
            <input id="lastName" value={lastName} onChange={function(e){ setLastName(e.target.value); }} className="w-full rounded-md border px-3 py-2" required />
          </div>
        </div>
        <div className="space-y-1">
          <label htmlFor="company" className="text-sm font-medium">Company</label>
          <input id="company" value={company} onChange={function(e){ setCompany(e.target.value); }} className="w-full rounded-md border px-3 py-2" />
        </div>
        <div className="space-y-1">
          <label htmlFor="email" className="text-sm font-medium">Email</label>
          <input id="email" type="email" value={email} onChange={function(e){ setEmail(e.target.value); }} className="w-full rounded-md border px-3 py-2" required />
        </div>
        <div className="space-y-1">
          <label htmlFor="password" className="text-sm font-medium">Password</label>
          <input id="password" type="password" value={password} onChange={function(e){ setPassword(e.target.value); }} className="w-full rounded-md border px-3 py-2" required />
        </div>
        <button type="submit" disabled={loading} className="w-full rounded-md bg-slate-900 text-white py-2 disabled:opacity-60">
          {loading ? 'Creating…' : 'Create account'}
        </button>
        <p className="text-sm text-slate-500">Already have an account? <Link to="/signin" className="text-slate-900 underline">Sign in</Link></p>
      </form>
    </div>
  );
}


