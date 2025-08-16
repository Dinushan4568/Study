import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { login } = useAuth();
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setError('');
    setLoading(true);
    try {
      await login(data.username, data.password);
      navigate('/');
    } catch (e) {
      setError(e.message || 'Login failed');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-600 via-indigo-600 to-purple-600 p-6">
      <div className="w-full max-w-md">
        <div className="bg-white/90 dark:bg-slate-900/80 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden ring-1 ring-white/10">
          <div className="p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-lg bg-white/20 flex items-center justify-center">
                {/* simple logo */}
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 3v18M3 12h18" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Demo Village</h1>
                <p className="text-sm text-slate-600 dark:text-slate-300 opacity-80">Admin sign in to continue</p>
              </div>
            </div>

            {error && <div className="mb-4 px-4 py-2 text-sm text-rose-700 bg-rose-100 rounded">{error}</div>}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <label className="block">
                <span className="text-sm text-slate-700 dark:text-slate-200">Username</span>
                <div className="mt-1 relative">
                  <input
                    className={`w-full pr-12 pl-10 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-indigo-400 transition ${errors.username ? 'border-rose-400' : 'border-slate-200'}`}
                    placeholder="Enter username"
                    {...register('username', { required: 'Username is required' })}
                    aria-invalid={errors.username ? 'true' : 'false'}
                  />
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 opacity-70">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 12c2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5 2.239 5 5 5zM3 21c0-3.866 4.477-7 9-7s9 3.134 9 7" stroke="#334155" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
                {errors.username && <p className="mt-1 text-xs text-rose-600">{errors.username.message}</p>}
              </label>

              <label className="block">
                <span className="text-sm text-slate-700 dark:text-slate-200">Password</span>
                <div className="mt-1 relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className={`w-full pr-12 pl-10 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-indigo-400 transition ${errors.password ? 'border-rose-400' : 'border-slate-200'}`}
                    placeholder="Enter password"
                    {...register('password', { required: 'Password is required' })}
                    aria-invalid={errors.password ? 'true' : 'false'}
                  />

                  <div className="absolute left-3 top-1/2 -translate-y-1/2 opacity-70">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 11a3 3 0 100-6 3 3 0 000 6z" stroke="#334155" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z" stroke="#334155" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>

                  <button type="button" onClick={() => setShowPassword(v => !v)} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-500 px-2 py-1 rounded-md hover:bg-slate-100/60">
                    {showPassword ? (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 3l18 18" stroke="#475569" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M9.88 9.88A3 3 0 0012 15a3 3 0 002.12-5.12" stroke="#475569" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    ) : (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z" stroke="#475569" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M12 15a3 3 0 100-6 3 3 0 000 6z" stroke="#475569" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    )}
                  </button>
                </div>
                {errors.password && <p className="mt-1 text-xs text-rose-600">{errors.password.message}</p>}
              </label>

              <div className="flex items-center justify-between text-sm">
                <label className="inline-flex items-center gap-2">
                  <input type="checkbox" className="rounded border-slate-300" />
                  <span className="text-slate-600">Remember me</span>
                </label>
                <a className="text-indigo-600 hover:underline text-sm" href="#">Forgot?</a>
              </div>

              <button type="submit" className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg flex items-center justify-center gap-2 disabled:opacity-60" disabled={loading}>
                {loading ? (
                  <svg className="animate-spin" width="18" height="18" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="#fff" strokeWidth="4"></circle>
                    <path className="opacity-75" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" fill="#fff"></path>
                  </svg>
                ) : null}
                <span>{loading ? 'Signing in...' : 'Sign in'}</span>
              </button>

              <div className="flex items-center gap-3 mt-2">
                <div className="flex-1 h-px bg-slate-200"></div>
                <div className="text-xs text-slate-600">or continue with</div>
                <div className="flex-1 h-px bg-slate-200"></div>
              </div>

              <div className="flex gap-3">
                <button type="button" className="flex-1 py-2 rounded-lg border bg-white/60 hover:bg-white text-sm">Google</button>
                <button type="button" className="flex-1 py-2 rounded-lg border bg-white/60 hover:bg-white text-sm">GitHub</button>
              </div>

              <div className="text-xs text-slate-500 text-center mt-3">Default: <span className="font-medium">admin</span> / <span className="font-medium">admin123</span></div>
            </form>
          </div>

          <div className="px-6 py-4 bg-slate-50/60 dark:bg-slate-800/60 border-t border-slate-100/60 flex items-center justify-between text-sm">
            <div>© 2025 Village HMS</div>
            <div className="flex gap-4">
              <a className="text-indigo-600" href="#">Contact</a>
              <a className="text-indigo-600" href="#">Help</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}