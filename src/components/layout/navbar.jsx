import React from 'react'
import { useDispatch,useSelector } from 'react-redux';
import { logout } from '../../store/slices/authSlice';
import styles from '../../styles/nav.module.css';
export default function Navbar() {

   const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
  };
  return (
   
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.logo}>Insurance Portal</h1>
          <div className={styles.userInfo}>
         
            <button className={styles.lgout} onClick={handleLogout} variant="outline" size="sm">
              Logout
            </button>
          </div>
        </div>
      </header>
      
    
  )
}
