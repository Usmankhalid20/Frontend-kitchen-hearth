import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import Button from '../../components/common/Button';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X } from 'lucide-react';

const Auth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, register, isLoading, error } = useAuthStore();

  // Check if we came to /register or /login
  const isRegisterRoute = location.pathname === '/register';
  const [isLogin, setIsLogin] = useState(!isRegisterRoute);

  // Form State
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  // Password Validation State
  const [pwdValidations, setPwdValidations] = useState({
    length: false,
    upper: false,
    lower: false,
    number: false,
    special: false,
  });

  const [passwordsMatch, setPasswordsMatch] = useState(true);

  // Validate password on change
  useEffect(() => {
    const pwd = formData.password;
    setPwdValidations({
      length: pwd.length >= 8,
      upper: /[A-Z]/.test(pwd),
      lower: /[a-z]/.test(pwd),
      number: /[0-9]/.test(pwd),
      special: /[^A-Za-z0-9]/.test(pwd),
    });

    if (formData.confirmPassword) {
      setPasswordsMatch(pwd === formData.confirmPassword);
    } else {
      setPasswordsMatch(true);
    }
  }, [formData.password, formData.confirmPassword]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isLogin) {
      const success = await login(formData.email, formData.password);
      if (success) {
        const currentUser = useAuthStore.getState().user;
        const isAdmin =
          currentUser?.role?.name === 'Admin' || currentUser?.role?.name === 'SuperAdmin';
        window.location.href = isAdmin ? '/admin/dashboard' : '/user/dashboard';
      }
    } else {
      if (!passwordsMatch) return;
      const allValid = Object.values(pwdValidations).every((v) => v);
      if (!allValid) return;

      const success = await register({
        firstName: formData.firstName,
        lastName: formData.lastName,
        username: formData.username,
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
      });

      if (success) {
        const currentUser = useAuthStore.getState().user;
        const isAdmin =
          currentUser?.role?.name === 'Admin' || currentUser?.role?.name === 'SuperAdmin';
        window.location.href = isAdmin ? '/admin/dashboard' : '/user/dashboard';
      }
    }
  };

  const inputClass =
    'appearance-none rounded-xl w-full px-4 py-3 border border-gray-200 placeholder-gray-400 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400/60 focus:border-amber-400 bg-white/70 transition';

  const ValidationItem = ({ isValid, text }) => (
    <div className={`flex items-center gap-2 text-xs ${isValid ? 'text-green-600' : 'text-gray-500'}`}>
      {isValid ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
      <span>{text}</span>
    </div>
  );

  return (
    <div
      className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 overflow-hidden relative"
      style={{ backgroundColor: 'var(--color-bg)' }}
    >
      {/* ── Ambient background glows ── */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full bg-amber-200/40 blur-[120px]" />
        <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full bg-orange-200/30 blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full bg-amber-100/50 blur-[140px]" />
        {/* Subtle grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(0,0,0,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.15) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-md w-full"
      >
        {/* ── Glassmorphic card ── */}
        <div
          className="bg-white/80 backdrop-blur-xl rounded-3xl border border-white/60 p-8"
          style={{ boxShadow: '0 8px 48px rgba(245,158,11,0.10), 0 2px 8px rgba(0,0,0,0.06)' }}
        >
          {/* ── Logo + heading ── */}
          <div className="flex flex-col items-center mb-8">
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4 shadow-lg"
              style={{ background: 'linear-gradient(135deg, #F59E0B, #EA580C)' }}
            >
              <span className="text-white text-2xl">🍽️</span>
            </div>
            <AnimatePresence mode="wait">
              <motion.h2
                key={isLogin ? 'login-title' : 'register-title'}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.25 }}
                className="text-2xl font-extrabold text-gray-900 text-center"
              >
                {isLogin ? 'Welcome back 👋' : 'Create an account'}
              </motion.h2>
            </AnimatePresence>
            <p className="text-sm text-gray-500 mt-1">
              {isLogin ? 'Sign in to Kitchen Hearth' : 'Join Kitchen Hearth today'}
            </p>
          </div>

          {/* ── Form ── */}
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="space-y-4">
              {/* Register-only fields */}
              <AnimatePresence mode="popLayout">
                {!isLogin && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-4 overflow-hidden"
                  >
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        name="firstName" type="text" required
                        className={inputClass}
                        placeholder="First Name"
                        value={formData.firstName}
                        onChange={handleChange}
                      />
                      <input
                        name="lastName" type="text" required
                        className={inputClass}
                        placeholder="Last Name"
                        value={formData.lastName}
                        onChange={handleChange}
                      />
                    </div>
                    <input
                      name="username" type="text" required
                      className={inputClass}
                      placeholder="Username"
                      value={formData.username}
                      onChange={handleChange}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Shared fields */}
              <input
                name="email" type="email" required
                className={inputClass}
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
              />
              <input
                name="password" type="password" required
                className={inputClass}
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />

              {/* Register-only: password checker + confirm */}
              <AnimatePresence mode="popLayout">
                {!isLogin && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-4 overflow-hidden"
                  >
                    <div className="bg-amber-50/70 p-3 rounded-xl border border-amber-100 grid grid-cols-2 gap-2">
                      <ValidationItem isValid={pwdValidations.length} text="8+ characters" />
                      <ValidationItem isValid={pwdValidations.upper} text="1 Uppercase" />
                      <ValidationItem isValid={pwdValidations.lower} text="1 Lowercase" />
                      <ValidationItem isValid={pwdValidations.number} text="1 Number" />
                      <ValidationItem isValid={pwdValidations.special} text="1 Special char" />
                    </div>

                    <div>
                      <input
                        name="confirmPassword" type="password" required
                        className={`appearance-none rounded-xl w-full px-4 py-3 border text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 bg-white/70 transition ${
                          !passwordsMatch
                            ? 'border-red-300 focus:ring-red-400/60 focus:border-red-400'
                            : 'border-gray-200 focus:ring-amber-400/60 focus:border-amber-400'
                        }`}
                        placeholder="Confirm Password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                      />
                      {!passwordsMatch && formData.confirmPassword && (
                        <p className="mt-1.5 text-xs text-red-500">Passwords do not match</p>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Error banner */}
            {error && (
              <div className="text-red-600 text-sm text-center bg-red-50 p-3 rounded-xl border border-red-100">
                {Array.isArray(error) ? error[0].message : error}
              </div>
            )}

            {/* Submit */}
            <Button
              type="submit"
              variant="primary"
              className="w-full justify-center text-base"
              disabled={
                isLoading ||
                (!isLogin && (!passwordsMatch || !Object.values(pwdValidations).every((v) => v)))
              }
            >
              {isLoading ? 'Please wait…' : isLogin ? 'Sign In' : 'Create Account'}
            </Button>

            {/* Toggle link */}
            <p className="text-center text-sm text-gray-500">
              {isLogin ? "Don't have an account? " : 'Already have an account? '}
              <button
                type="button"
                onClick={toggleAuthMode}
                className="font-semibold text-amber-600 hover:text-amber-500 transition-colors"
              >
                {isLogin ? 'Sign up here' : 'Log in here'}
              </button>
            </p>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default Auth;
