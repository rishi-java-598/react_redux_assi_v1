import { useState } from 'react';
import { useSelector } from 'react-redux';
import styles from '../../styles/customerDashboard.module.css';
import styles2 from '../../styles/adminDashboard.module.css'
import UploadDocuments from './Doc';


const CustomerDashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const { policies } = useSelector((state) => state.policies);
  const { claims } = useSelector((state) => state.claims);
  const { payments: reduxPayments } = useSelector((state) => state.payments);

  const [searchTerm, setSearchTerm] = useState('');
  const [paymentAmounts, setPaymentAmounts] = useState({}); // key: policyId, value: string
  const [payments, setPayments] = useState(reduxPayments); // local state for new payments
  const [activeTab, setActiveTab] = useState('policies');

  const userPolicies = policies.filter(p => p.customerId === user?.id);
  const userClaims = claims.filter(c => c.customerId === user?.id);
  const userPayments = payments.filter(p => p.customerId === user?.id);

  const filteredPolicies = userPolicies.filter(policy =>
    policy.policyNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    policy.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredClaims = userClaims.filter(claim =>
    claim.claimNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    claim.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInputChange = (policyId, value) => {
    setPaymentAmounts(prev => ({
      ...prev,
      [policyId]: value
    }));
  };

  const handlePayment = (policyId) => {
    const amount = paymentAmounts[policyId];
    if (!amount || isNaN(amount) || Number(amount) <= 0) return;

    const newPayment = {
      id: `${Date.now()}`,
      customerId: user.id,
      policyId,
      date: new Date().toISOString().split('T')[0],
      amount: Number(amount),
      type: 'Online',
      status: 'Completed'
    };

    // Add to local payment list
    setPayments(prev => [...prev, newPayment]);

    // Reset input
    setPaymentAmounts(prev => ({
      ...prev,
      [policyId]: ''
    }));

    alert(`Payment of $${amount} initiated for policy ${policyId}`);
  };

  return (
    <div className={styles2.dashboard}>
      <div className={styles2.header}>
        <h1>Welcome, {user?.name}</h1>
        <p>Customer Dashboard</p>
      </div>

      <div className={styles2.tabs}>
        <div className={styles2.tabsList}>

                    <div className={activeTab === 'policies' ? styles2.activeTab : ''} onClick={() => setActiveTab('policies')}>policies</div>
                    <div className={activeTab === 'claims' ? styles2.activeTab : ''} onClick={() => setActiveTab('claims')}>claims</div>
                    <div className={activeTab === 'payments' ? styles2.activeTab : ''} onClick={() => setActiveTab('payments')}>payments</div>
                    <div className={activeTab === 'documents' ? styles2.activeTab : ''} onClick={() => setActiveTab('documents')}>documents</div>
      </div>
        </div>

        {activeTab === 'policies' && (
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2>My Policies</h2>
              <input
                className={styles.searchInput}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search policies..."
              />
            </div>

            <div className={styles.grid}>
              {filteredPolicies.map(policy => (
                <div key={policy.id} className={styles.card}>
                  <div className={styles.cardHeader}>
                    <h3>{policy.type}</h3>
                    <p>Policy: {policy.policyNumber}</p>
                  </div>
                  <div className={styles.cardContent}>
                    <p><strong>Premium:</strong> ${policy.premium}</p>
                    <p><strong>Status:</strong>
                      <span className={`${styles.status} ${styles[policy.status.toLowerCase()]}`}>
                        {policy.status}
                      </span>
                    </p>
                    <p><strong>Period:</strong> {policy.startDate} to {policy.endDate}</p>

                    <div className={styles.paymentSection}>
                      <input
                        type="number"
                        placeholder="Payment amount"
                        value={paymentAmounts[policy.id] || ''}
                        onChange={(e) => handleInputChange(policy.id, e.target.value)}
                        className={styles.paymentInput}
                      />
                      <button
                        onClick={() => handlePayment(policy.id)}
                        className={styles.payButton}
                      >
                        Make Payment
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'claims' && (
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2>My Claims</h2>
              <input
                className={styles.searchInput}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search claims..."
              />
            </div>

            <div className={styles.grid}>
              {filteredClaims.map(claim => (
                <div key={claim.id} className={styles.card}>
                  <div className={styles.cardHeader}>
                    <h3>Claim {claim.claimNumber}</h3>
                    <p>{claim.description}</p>
                  </div>
                  <div className={styles.cardContent}>
                    <p><strong>Amount:</strong> ${claim.amount}</p>
                    <p><strong>Status:</strong>
                      <span className={`${styles.status} ${styles[claim.status.toLowerCase()]}`}>
                        {claim.status}
                      </span>
                    </p>
                    <p><strong>Submitted:</strong> {claim.dateSubmitted}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'payments' && (
          // <div className={styles.section}>
          //   <h2>Payment History</h2>
          //   <div className={styles.table}>
          //     <div className={styles.tableHeader}>
          //       <span>Date</span>
          //       <span>Amount</span>
          //       <span>Type</span>
          //       <span>Status</span>
          //     </div>
          //     {userPayments.map(payment => (
          //       <div key={payment.id} className={styles.tableRow}>
          //         <span>{payment.date}</span>
          //         <span>${payment.amount}</span>
          //         <span>{payment.type}</span>
          //         <span className={`${styles.status} ${styles[payment.status.toLowerCase()]}`}>
          //           {payment.status}
          //         </span>
          //       </div>
          //     ))}
          //   </div>
          // </div>
          <div className={styles.section}>
            <h2>Payment History</h2>
                      <div className={styles2.outerbody}>

            <div className={`${styles.table} ${styles2.norm}`}>
              <div className={styles.tableHeader}>
                <span>Date</span>
                <span>Amount</span>
                <span>Type</span>
                <span>Status</span>
              </div>
              {userPayments.map(payment => (
                <div key={payment.id} className={styles.tableRow}>
                  <span>{payment.date}</span>
                  <span>${payment.amount}</span>
                  <span>{payment.type}</span>
                  <span className={`${styles.status} ${styles[payment.status.toLowerCase()]}`}>
                    {payment.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
          </div>
         
        )}

        {activeTab === 'documents' && (
          <div className={styles.section}>
            <h2>Document Management</h2>
            <UploadDocuments />
          </div>
        )}
      </div>
  );
};

export default CustomerDashboard;
