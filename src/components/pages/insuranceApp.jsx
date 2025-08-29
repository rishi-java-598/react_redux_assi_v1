import { useSelector } from 'react-redux';
import Login from '../login/login';
import CustomerDashboard from '../dashboards/CustomerDashboard';
import AgentDashboard from '../dashboards/AgentDashboard';
import AdminDashboard from '../dashboards/AdminDashboard';
import Navbar from '../layout/navbar';

const InsuranceApp = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <Login />;
  }

  const renderDashboard = () => {
    switch (user?.role) {
      case 'customer':
        return<><Navbar/> <CustomerDashboard /></>;
      case 'agent':
        return<><Navbar/> <AgentDashboard /> </>;
      case 'administrator':
        return <><Navbar/><AdminDashboard /> </>;
      default:
        return <div>Invalid user role</div>;
    }
  };

  return (
    <>
      {renderDashboard()}
    </>
  );
};

export default InsuranceApp;