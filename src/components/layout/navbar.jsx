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
            {/* <span>Welcome, {user?.name}</span>
            <span className={styles.role}>({user?.role})</span> */}
            <button className={styles.lgout} onClick={handleLogout} variant="outline" size="sm">
              Logout
            </button>
          </div>
        </div>
      </header>
      
    
  )
}

// import { useSelector, useDispatch } from 'react-redux';
// import { RootState } from '../../store/store';
// import { logout } from '../../store/slices/authSlice';
// import { Button } from '../ui/button';
// import styles from './Layout.module.css';

// interface LayoutProps {
//   children: React.ReactNode;
// }

// const Layout = ({ children }: LayoutProps) => {
//   const dispatch = useDispatch();
//   const { user } = useSelector((state: RootState) => state.auth);

//   const handleLogout = () => {
//     dispatch(logout());
//   };

//   return (
//     <div className={styles.layout}>
//       <header className={styles.header}>
//         <div className={styles.headerContent}>
//           <h1 className={styles.logo}>Insurance Portal</h1>
//           <div className={styles.userInfo}>
//             <span>Welcome, {user?.name}</span>
//             <span className={styles.role}>({user?.role})</span>
//             <Button onClick={handleLogout} variant="outline" size="sm">
//               Logout
//             </Button>
//           </div>
//         </div>
//       </header>
//       <main className={styles.main}>
//         {children}
//       </main>
//     </div>
//   );
// };

// export default Layout;