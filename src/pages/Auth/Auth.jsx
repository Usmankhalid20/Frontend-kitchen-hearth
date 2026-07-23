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
    confirmPassword: ''
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
      special: /[^A-Za-z0-9]/.test(pwd)
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
    // Optionally clear errors or form here if desired
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (isLogin) {
      const success = await login(formData.email, formData.password);
      if (success) {
        const currentUser = useAuthStore.getState().user;
        const isAdmin = currentUser?.role?.name === 'Admin' || currentUser?.role?.name === 'SuperAdmin';
        const defaultPath = isAdmin ? '/admin/dashboard' : '/user/dashboard';
        
        window.location.href = defaultPath;
      }
    } else {
      if (!passwordsMatch) return;
      const allValid = Object.values(pwdValidations).every(v => v);
      if (!allValid) return; // Prevent submission if password is weak

      const success = await register({
        firstName: formData.firstName,
        lastName: formData.lastName,
        username: formData.username,
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword
      });
      
      if (success) {
        const currentUser = useAuthStore.getState().user;
        const isAdmin = currentUser?.role?.name === 'Admin' || currentUser?.role?.name === 'SuperAdmin';
        const defaultPath = isAdmin ? '/admin/dashboard' : '/user/dashboard';
        window.location.href = defaultPath;
      }
    }
  };

  const ValidationItem = ({ isValid, text }) => (
    <div className={`flex items-center gap-2 text-xs ${isValid ? 'text-green-600' : 'text-gray-500'}`}>
      {isValid ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
      <span>{text}</span>
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-xl border border-gray-100"
      >
        <div>
          <h2 className="mt-2 text-center text-3xl font-extrabold text-gray-900">
            {isLogin ? 'Welcome back' : 'Create an account'}
          </h2>

        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <AnimatePresence mode="popLayout">
              {!isLogin && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <input name="firstName" type="text" required={!isLogin}
                        className="appearance-none rounded-lg relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm"
                        placeholder="First Name" value={formData.firstName} onChange={handleChange} />
                    </div>
                    <div>
                      <input name="lastName" type="text" required={!isLogin}
                        className="appearance-none rounded-lg relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm"
                        placeholder="Last Name" value={formData.lastName} onChange={handleChange} />
                    </div>
                  </div>
                  <div>
                    <input name="username" type="text" required={!isLogin}
                      className="appearance-none rounded-lg relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm"
                      placeholder="Username" value={formData.username} onChange={handleChange} />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div>
              <input name="email" type="email" required
                className="appearance-none rounded-lg relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm"
                placeholder="Email address" value={formData.email} onChange={handleChange} />
            </div>

            <div>
              <input name="password" type="password" required
                className="appearance-none rounded-lg relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm"
                placeholder="Password" value={formData.password} onChange={handleChange} />
            </div>

            <AnimatePresence mode="popLayout">
              {!isLogin && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-4"
                >
                  <div className="bg-gray-50 p-3 rounded-lg border border-gray-100 grid grid-cols-2 gap-2">
                    <ValidationItem isValid={pwdValidations.length} text="8+ characters" />
                    <ValidationItem isValid={pwdValidations.upper} text="1 Uppercase" />
                    <ValidationItem isValid={pwdValidations.lower} text="1 Lowercase" />
                    <ValidationItem isValid={pwdValidations.number} text="1 Number" />
                    <ValidationItem isValid={pwdValidations.special} text="1 Special char" />
                  </div>
                  
                  <div>
                    <input name="confirmPassword" type="password" required={!isLogin}
                      className={`appearance-none rounded-lg relative block w-full px-3 py-3 border ${!passwordsMatch ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-amber-500 focus:ring-amber-500'} placeholder-gray-500 text-gray-900 focus:outline-none sm:text-sm`}
                      placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} />
                    {!passwordsMatch && formData.confirmPassword && (
                      <p className="mt-1 text-xs text-red-500">Passwords do not match</p>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {error && (
            <div className="text-red-500 text-sm text-center bg-red-50 p-3 rounded-lg border border-red-100">
              {Array.isArray(error) ? error[0].message : error}
            </div>
          )}

          <div>
                      <p className="mt-2 mb-4 text-center text-sm text-gray-600">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button 
              type="button"
              onClick={toggleAuthMode}
              className="font-medium text-amber-600 hover:text-amber-500 transition-colors"
            >
              {isLogin ? 'Sign up here' : 'Log in here'}
            </button>
          </p>

            <Button
              type="submit"
              variant="primary"
              className="w-full justify-center text-lg"
              disabled={isLoading || (!isLogin && (!passwordsMatch || !Object.values(pwdValidations).every(v => v)))}
            >
              {isLoading ? 'Please wait...' : (isLogin ? 'Sign In' : 'Create Account')}
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default Auth;
