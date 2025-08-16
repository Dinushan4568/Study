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
    <div className="login-wrapper">
      <div className="card" role="dialog" aria-labelledby="login-title">
        <div className="brand" style={{marginBottom:12}}>
          <div className="logo" aria-hidden>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="g1" x1="0" x2="1">
                  <stop offset="0%" stopColor="#fff" stopOpacity="0.9"/>
                  <stop offset="100%" stopColor="#ffffff" stopOpacity="0.7"/>
                </linearGradient>
              </defs>
              <rect x="3" y="3" width="18" height="18" rx="3" fill="url(#g1)" opacity="0.14"/>
              <path d="M7 12h10M12 7v10" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div>
            <h1 id="login-title" style={{margin:0}}>Demo Village</h1>
            <div className="muted">Admin sign in to continue</div>
          </div>
        </div>

        {error && <div className="error" role="alert">{error}</div>}

        <form onSubmit={handleSubmit(onSubmit)} aria-describedby="login-help">
          <label>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'baseline'}}>
              <span>Username</span>
              {errors.username && <span style={{color:'#ef4444',fontSize:12}}>{errors.username.message}</span>}
            </div>
            <div className="field-with-icon">
              <span className="icon" aria-hidden>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 12c2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5 2.239 5 5 5zM3 21c0-3.866 4.477-7 9-7s9 3.134 9 7" stroke="#334155" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </span>
              <input
                className="input"
                placeholder="Enter username"
                {...register('username', { required: 'Username is required' })}
                aria-invalid={errors.username ? 'true' : 'false'}
              />
            </div>
          </label>

          <label style={{marginTop:12}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'baseline'}}>
              <span>Password</span>
              {errors.password && <span style={{color:'#ef4444',fontSize:12}}>{errors.password.message}</span>}
            </div>

            <div className="field-with-icon" style={{marginTop:6}}>
              <span className="icon" aria-hidden>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 11a3 3 0 100-6 3 3 0 000 6z" stroke="#334155" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z" stroke="#334155" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </span>

              <input
                type={showPassword ? 'text' : 'password'}
                className="input"
                placeholder="Enter password"
                {...register('password', { required: 'Password is required' })}
                aria-invalid={errors.password ? 'true' : 'false'}
              />

              <button type="button" onClick={() => setShowPassword(v => !v)} aria-pressed={showPassword} title={showPassword ? 'Hide password' : 'Show password'} style={{position:'absolute',right:8,top:'50%',transform:'translateY(-50%)',background:'transparent',border:0,cursor:'pointer'}}>
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
          </label>

          <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginTop:12}}>
            <label style={{display:'flex',alignItems:'center',gap:8}}><input type="checkbox" /> <span className="muted">Remember me</span></label>
            <a href="#" className="muted">Forgot?</a>
          </div>

          <div style={{marginTop:16,display:'flex',gap:10}}>
            <button type="submit" className="btn" disabled={loading} style={{flex:1}}>
              {loading ? <span className="spinner" aria-hidden /> : null}
              <span style={{marginLeft: loading ? 8 : 0}}>{loading ? 'Signing in...' : 'Sign in'}</span>
            </button>

            <button type="button" className="btn secondary" onClick={() => navigate(-1)} style={{minWidth:110}}>Cancel</button>
          </div>

          <div className="hr" style={{marginTop:18}}>or continue with</div>

          <div style={{display:'flex',gap:10,marginTop:12}}>
            <button type="button" className="btn secondary" style={{flex:1}} aria-label="Sign in with Google">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M21 12.3c0-.7-.1-1.3-.2-1.9H12v3.5h5.5c-.2 1.2-.9 2.3-1.9 3l3 2.3C20.6 17 21 14.8 21 12.3z" fill="#4285F4"/></svg>
              <span>Google</span>
            </button>
            <button type="button" className="btn secondary" style={{flex:1}} aria-label="Sign in with GitHub">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 .5C5.7.5.7 5.6.7 11.9c0 5 3.3 9.2 7.9 10.7.6.1.8-.3.8-.6v-2.1c-3.2.7-3.9-1.4-3.9-1.4-.5-1.2-1.2-1.5-1.2-1.5-1-.7.1-.7.1-.7 1.1.1 1.6 1.1 1.6 1.1 1 .1 1.6-.7 1.8-1.1.4-1 .8-1.4 1.6-1.8-2.6-.3-5.3-1.3-5.3-5.8 0-1.3.5-2.4 1.2-3.3-.2-.3-.5-1.5.1-3 0 0 1-.3 3.4 1.2 1-.3 2-.4 3-.4s2 .1 3 .4C17.8 3.7 18.8 4 18.8 4c.6 1.5.3 2.7.1 3 0 0 1.2 2 1.2 3.3 0 4.5-2.7 5.4-5.3 5.8.9.8 1.6 2.1 1.6 4.2v6.1c0 .3.2.7.8.6 4.6-1.5 7.9-5.7 7.9-10.7C23.3 5.6 18.3.5 12 .5z" fill="#111"/></svg>
              <span>GitHub</span>
            </button>
          </div>

          <div id="login-help" className="helper center" style={{marginTop:14}}>Default: <strong>admin</strong> / <strong>admin123</strong></div>
        </form>

        <div style={{marginTop:14,display:'flex',justifyContent:'space-between',alignItems:'center'}}>
          <div className="muted">© {new Date().getFullYear()} Village HMS</div>
          <div style={{display:'flex',gap:12}}>
            <a className="muted" href="#">Contact</a>
            <a className="muted" href="#">Help</a>
          </div>
        </div>
      </div>
    </div>
  );
}