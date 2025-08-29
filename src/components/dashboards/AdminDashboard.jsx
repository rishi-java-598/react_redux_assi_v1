
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, deleteUser } from '../../store/slices/usersSlice';
import styles from '../../styles/AdminDashboard.module.css';

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const { policies } = useSelector(state => state.policies);
  const { claims } = useSelector(state => state.claims);
  const { users } = useSelector(state => state.users);

  const [searchTerm, setSearchTerm] = useState('');
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: '',
    phone: '',
  });
  const [selectedTab, setSelectedTab] = useState('overview');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const totalPolicies = policies.length;
  const activePolicies = policies.filter(p => p.status === 'Active').length;
  const pendingClaims = claims.filter(c => c.status === 'Pending').length;
  const totalUsers = users.length;

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateUser = () => {
    if (!newUser.name || !newUser.email || !newUser.role) {
      alert('Please fill all required fields');
      return;
    }

    const user = {
      id: Date.now().toString(),
      ...newUser,
      password: 'password',
    };

    dispatch(addUser(user));
    setNewUser({ name: '', email: '', role: '', phone: '' });
    setIsModalOpen(false);
    alert('User created successfully!');
  };

  const handleDeleteUser = (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      dispatch(deleteUser(userId));
      alert('User deleted successfully!');
    }
  };

  return (
    <div className={styles.outer}>
 
    <div className={styles.dashboard}>
  
           <div className={styles.header}>
        <h1>Welcome, {user?.name}</h1>
        <p>Administrator Dashboard</p>
      </div>
      <div className={styles.tabs}>
        <div className={styles.tabsList}>
          <div className={selectedTab === 'overview' ? styles.activeTab : ''} onClick={() => setSelectedTab('overview')}>Overview</div>
          <div className={selectedTab === 'users' ? styles.activeTab : ''} onClick={() => setSelectedTab('users')}>Manage Users</div>
          <div className={selectedTab === 'policies' ? styles.activeTab : ''} onClick={() => setSelectedTab('policies')}>Policy Status</div>
          <div className={selectedTab === 'claims' ? styles.activeTab : ''} onClick={() => setSelectedTab('claims')}>Claims Status</div>
        </div>
      </div>
        {selectedTab === 'overview' && (
          <div className={styles.overview}>
            <div className={styles.stats}>
              <div className={styles.statCard}>
                <h3>Total Users</h3>
                <p>{totalUsers}</p>
              </div>
              <div className={styles.statCard}>
                <h3>Total Policies</h3>
                <p>{totalPolicies}</p>
              </div>
              <div className={styles.statCard}>
                <h3>Active Policies</h3>
                <p>{activePolicies}</p>
              </div>
              <div className={styles.statCard}>
                <h3>Pending Claims</h3>
                <p>{pendingClaims}</p>
              </div>
            </div>

            <div className={styles.statusoverview}>
              
              <div className={styles.sotab}>

                <div className={styles.upper}>
                  <h3>Policy Status Overview</h3>
                </div>
                <div className={styles.dipper}>

              <div className={styles.soinup}>
                                    <span className={styles.actspan}>active</span>
                                    <span>1 policies</span>
                                    
                                    </div>
                                    <div className={styles.soindown}>
                                    <span className={styles.normspan}>pending</span>
                                    <span>2 policies</span>
                                    </div>

                </div>

              </div>

              <div className={styles.sotab}>

                <div className={styles.upper}>
                                    <h3>Claim Status Overview</h3>

                                    
                                   


                </div>
                <div className={styles.dipper}>
<div className={styles.soinup}>
                                    <span className={styles.normspan}>pending</span>
                                    <span>1 claims</span>
                                    
                                    </div>
                                    <div className={styles.soindown}>
                                    <span className={styles.actspan}>approved</span>
                                    <span>2 claims</span>
                                    </div>

                </div>

              </div>
              
             
              
            </div>
          </div>
        )}

        {selectedTab === 'users' && (
          <div className={styles.manageUsers}>
           
            <div className={styles.toolsdiv}>
              <h2>Manage Users</h2>
               <input
              type="text"
              value={searchTerm}
              className={styles.sbar}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search users..."
            />
              <button className={styles.addUserButton} onClick={() => setIsModalOpen(true)}>Add New User</button>


            </div>

            {isModalOpen && (
              <div className={styles.modal}>
                <div className={styles.modalContent}>
                  <h2>Create New User</h2>
                  <input
                    type="text"
                    placeholder="Name"
                    value={newUser.name}
                    onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={newUser.email}
                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  />
                  <input
                    type="text"
                    placeholder="Phone"
                    value={newUser.phone}
                    onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
                  />
                  <select onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}>
                    <option value="">Select Role</option>
                    <option value="customer">Customer</option>
                    <option value="agent">Agent</option>
                    <option value="administrator">Administrator</option>
                  </select>
                  <button onClick={handleCreateUser}>Create User</button>
                  <button onClick={() => setIsModalOpen(false)}>Cancel</button>
                </div>
              </div>
            )}



             {/* <div className={styles.usersList}>
              {filteredUsers.map(user => (
                <div key={user.id} className={styles.userRow}>
                  <span>{user.name}</span>
                  <span>{user.email}</span>
                  <span>{user.role}</span>
                  <span>{user.phone}</span>
                  <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
                </div>
              ))}
            </div> */}

<div className={styles.usersList}>
  <div className={styles.tableHeader}>
    <span>Name</span>
    <span>Email</span>
    <span>Role</span>
    <span>Phone</span>
    <span>Actions</span>
  </div>

  {filteredUsers.map(user => (
    <div key={user.id} className={styles.userRow}>
      <span>{user.name}</span>
      <span>{user.email}</span>
      <span>
        <span className={styles.roleBadge}>{user.role}</span>
      </span>
      <span>{user.phone}</span>
      <span className={styles.actions}>
        <button className={styles.deleteBtn} onClick={() => handleDeleteUser(user.id)}>Delete</button>
      </span>
    </div>
  ))}
</div>




          </div>


          
        )
        
        
        }
        

        {/* {selectedTab === 'policies' && (
          <div className={styles.policies}>
            <h2>All Policies</h2>
            <div className={styles.table}>
              <div className={styles.tableHeader}>
                <span>Policy Number</span>
                <span>Type</span>
                <span>Customer</span>
                <span>Premium</span>
                <span>Status</span>
              </div>
              {policies.map(policy => {
                const customer = users.find(u => u.id === policy.customerId);
                return (
                  <div key={policy.id} className={styles.tableRow}>
                    <span>{policy.policyNumber}</span>
                    <span>{policy.type}</span>
                    <span>{customer?.name || 'Unknown'}</span>
                    <span>${policy.premium}</span>
                    <span className={`${styles.status} ${styles[policy.status.toLowerCase()]}`}>
                      {policy.status}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )} */}
        {selectedTab === 'policies' && (
  <div className={styles.policies}>
    <h2 style={{marginTop:"34px"}}>All Policies</h2>

    <div className={styles.usersList}>
      <div className={styles.tableHeader}>
        <span>Policy Number</span>
        <span>Type</span>
        <span>Customer</span>
        <span>Premium</span>
        <span>Status</span>
      </div>

      {policies.map(policy => {
        const customer = users.find(u => u.id === policy.customerId);
        return (
          <div key={policy.id} className={styles.userRow}>
            <span>{policy.policyNumber}</span>
            <span>{policy.type}</span>
            <span>{customer?.name || 'Unknown'}</span>
            <span>${policy.premium}</span>
            <span>
              <span
                className={policy.status==='Active'?`${styles.roleBadge} ${
                  styles[policy.status.toLowerCase()] || ''
                }`:''}
                style={{fontSize:"0.75rem"}}
              >
                {policy.status}
              </span>
            </span>
          </div>
        );
      })}
    </div>
  </div>
)}


       {selectedTab === 'claims' && (
  <div className={styles.claims}>
    <h2 style={{marginTop:"34px"}}>All Claims</h2>

    <div className={styles.usersList}>
      <div className={styles.tableHeader}>
        <span>Claim Number</span>
        <span>Customer</span>
        <span>Amount</span>
        <span>Status</span>
        <span>Date</span>
      </div>

      {claims.map(claim => {
        const customer = users.find(u => u.id === claim.customerId);
        return (
          <div key={claim.id} className={styles.userRow}>
            <span>{claim.claimNumber}</span>
            <span>{customer?.name || 'Unknown'}</span>
            <span>${claim.amount}</span>
            <span>
              <span
                className={claim.status==='Approved'?`${styles.roleBadge} ${
                  styles[claim.status.toLowerCase()] || ''
                }`:"" }
                style={{fontSize:"0.75rem"}}
              >
                {claim.status}
              </span>
            </span>
            <span>{claim.dateSubmitted}</span>
          </div>
        );
      })}
    </div>
  </div>
)}

      </div>
    </div>
  );
};

export default AdminDashboard;
