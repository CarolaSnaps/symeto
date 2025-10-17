import { FormEvent, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getSupabaseClient } from '@/lib/supabaseClient';

export function SignInPage(): JSX.Element {
  const navigate = useNavigate();
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
      const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
      if (signInError) {
        throw signInError;
      }
      navigate('/app');
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
      <form onSubmit={handleSubmit} className="w-full max-w-sm bg-white rounded-lg shadow p-6 space-y-4">
        <h1 className="text-xl font-semibold">Sign in</h1>
        {error && <div className="text-sm text-red-600">{error}</div>}
        <div className="space-y-1">
          <label htmlFor="email" className="text-sm font-medium">Email</label>
          <input id="email" type="email" value={email} onChange={function(e){ setEmail(e.target.value); }} className="w-full rounded-md border px-3 py-2" required />
        </div>
        <div className="space-y-1">
          <label htmlFor="password" className="text-sm font-medium">Password</label>
          <input id="password" type="password" value={password} onChange={function(e){ setPassword(e.target.value); }} className="w-full rounded-md border px-3 py-2" required />
        </div>
        <button type="submit" disabled={loading} className="w-full rounded-md bg-slate-900 text-white py-2 disabled:opacity-60">
          {loading ? 'Signing in…' : 'Sign in'}
        </button>
        <p className="text-sm text-slate-500">No account? <Link to="/signup" className="text-slate-900 underline">Sign up</Link></p>
      </form>
    </div>
  );
}


