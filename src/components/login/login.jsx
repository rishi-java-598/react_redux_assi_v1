import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginStart, loginSuccess, loginFailure } from '../../store/slices/authSlice';
import styles from '../../styles/login.module.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  
  const dispatch = useDispatch();
  const { loading, error,user } = useSelector((state) => state.auth);
  const users = useSelector((state) => state.users.users);

  const validateForm = () => {
    const newErrors = {};
    
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    dispatch(loginStart());
    
    // Simulate API call
    setTimeout(() => {
      const user = users.find(u => u.email === email && u.password === password);
      console.log(user);
      
      if (user) {
        dispatch(loginSuccess(user));
      } else {
        dispatch(loginFailure('Invalid credentials'));
      }
    }, 1000);
  };
console.log(user);

  
  const demoCredentials = [
    { email: 'john@example.com', role: 'Customer' },
    { email: 'agent@example.com', role: 'Agent' },
    { email: 'admin@example.com', role: 'Administrator' },
  ];

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginCard}>
        <div className={styles.cardHeader}>
          <h2>Insurance Portal Login</h2>
          <p>Sign in to access your insurance dashboard</p>
        </div>
        <div className={styles.cardContent}>
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.inputGroup}>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={errors.email ? styles.inputError : ''}
              />
              {errors.email && <span className={styles.error}>{errors.email}</span>}
            </div>
            
            <div className={styles.inputGroup}>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={errors.password ? styles.inputError : ''}
              />
              {errors.password && <span className={styles.error}>{errors.password}</span>}
            </div>
            
            {error && <div className={styles.errorMessage}>{error}</div>}
            
            <button type="submit" disabled={loading} className={styles.submitButton}>
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
          
          <div className={styles.demoSection}>
            <h4>Demo Credentials:</h4>
            {demoCredentials.map((cred, index) => (
              <div key={index} className={styles.demoCredential}>
                <strong>{cred.role}:</strong> {cred.email} / password
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
