import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSupabaseClient } from '@/lib/supabaseClient';

type SessionState = {
  userEmail: string | null;
};

export function WorkspacePage(): JSX.Element {
  const navigate = useNavigate();
  const [session, setSession] = useState<SessionState>({ userEmail: null });

  useEffect(function() {
    const supabase = getSupabaseClient();
    supabase.auth.getSession().then(function(result){
      if (result.data.session == null) {
        navigate('/signin');
        return;
      }
      setSession({ userEmail: result.data.session.user.email ?? null });
    });
  }, [navigate]);

  function handleSignOut(): void {
    const supabase = getSupabaseClient();
    supabase.auth.signOut().then(function(){
      navigate('/signin');
    });
  }

  return (
    <div className="min-h-screen grid grid-cols-[260px_1fr]">
      <aside className="border-r p-4 space-y-4">
        <div className="font-semibold">Symeto</div>
        <div className="text-xs text-slate-500">{session.userEmail}</div>
        <nav className="space-y-2">
          <div className="text-sm text-slate-600">Projects</div>
          <button className="w-full text-left rounded px-2 py-1 hover:bg-slate-100">Sample Project</button>
        </nav>
        <button onClick={handleSignOut} className="rounded bg-slate-900 text-white px-3 py-1 text-sm">Sign out</button>
      </aside>
      <main className="p-6">
        <h1 className="text-xl font-semibold mb-4">Workspace</h1>
        <div className="grid grid-cols-2 gap-6">
          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="font-medium">Criteria</h2>
              <button className="rounded bg-slate-900 text-white px-3 py-1 text-sm">New criterion</button>
            </div>
            <div className="rounded border p-3 text-sm text-slate-500">No criteria yet.</div>
          </section>
          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="font-medium">PDFs</h2>
              <button className="rounded bg-slate-900 text-white px-3 py-1 text-sm">Upload PDF</button>
            </div>
            <div className="rounded border p-3 text-sm text-slate-500">No PDFs uploaded.</div>
          </section>
        </div>
      </main>
    </div>
  );
}


