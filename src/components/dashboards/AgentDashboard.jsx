import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addPolicy } from "../../store/slices/policiesSlice";
import { updateClaim } from "../../store/slices/claimSlice";
import styles from "../../styles/AgentDashboard.module.css";
import styles2 from '../../styles/adminDashboard.module.css'
import styles3 from '../../styles/customerDashboard.module.css'

const AgentDashboard = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { policies } = useSelector((state) => state.policies);
  const { claims } = useSelector((state) => state.claims);
  const { users } = useSelector((state) => state.users);

  const [activeTab, setActiveTab] = useState("overview");
  const [searchTerm, setSearchTerm] = useState("");
  const [newPolicy, setNewPolicy] = useState({
    type: "",
    premium: "",
    customerId: "",
  });

  const agentPolicies = policies.filter((p) => p.agentId === user?.id);
  const agentClaims = claims.filter((c) => {
    const policy = policies.find((p) => p.id === c.policyId);
    return policy?.agentId === user?.id;
  });
  const customers = users.filter((u) => u.role === "customer");

  const filteredPolicies = agentPolicies.filter(
    (policy) =>
      policy.policyNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      policy.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredClaims = agentClaims.filter(
    (claim) =>
      claim.claimNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      claim.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreatePolicy = () => {
    if (!newPolicy.type || !newPolicy.premium || !newPolicy.customerId) {
      alert("Please fill all fields");
      return;
    }

    const policy = {
      id: Date.now().toString(),
      policyNumber: `POL-${Date.now()}`,
      type: newPolicy.type,
      premium: parseFloat(newPolicy.premium),
      status: "Pending",
      startDate: new Date().toISOString().split("T")[0],
      endDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0],
      customerId: newPolicy.customerId,
      agentId: user?.id,
    };

    dispatch(addPolicy(policy));
    setNewPolicy({ type: "", premium: "", customerId: "" });
    alert("Policy created successfully!");
  };

  const handleProcessClaim = (claimId, newStatus) => {
    const claim = claims.find((c) => c.id === claimId);
    if (claim) {
      dispatch(updateClaim({ ...claim, status: newStatus }));
      alert(`Claim ${newStatus.toLowerCase()} successfully!`);
    }
  };

  const getCustomerName = (customerId) => {
    const customer = customers.find((c) => c.id === customerId);
    return customer?.name || "Unknown";
  };

  return (
    <div className={styles2.dashboard}>
      <div className={styles2.header}>
        <h1>Welcome, {user?.name}</h1>
        <p>Agent Dashboard</p>
      </div>

      {/* Tabs */}
      <div className={styles2.tabs}>
        <div className={styles2.tabsList}>
        


                    <div className={activeTab === 'overview' ? styles2.activeTab : ''} onClick={() => setActiveTab('overview')}>overview</div>
                    <div className={activeTab === 'policies' ? styles2.activeTab : ''} onClick={() => setActiveTab('policies')}>customer policies</div>
                    <div className={activeTab === 'claims' ? styles2.activeTab : ''} onClick={() => setActiveTab('claims')}>process claims</div>
                    <div className={activeTab === 'create' ? styles2.activeTab : ''} onClick={() => setActiveTab('create')}>create policy</div>
        </div>
        </div>

        {/* Overview */}
        {activeTab === "overview" && (
          <div className={styles.overview}>
            <div className={styles2.stats}>

              <div className={styles.card}>
                <h3>Total Policies</h3>
                <div className={styles.statNumber}>{agentPolicies.length}</div>
              </div>

              <div className={styles.card}>
                <h3>Active Claims</h3>
                <div className={styles.statNumber}>
                  {agentClaims.filter((c) => c.status === "Pending").length}
                </div>
              </div>

              <div className={styles.card}>
                <h3>Total Premium</h3>
                <div className={styles.statNumber}>
                  $
                  {agentPolicies
                    .reduce((sum, p) => sum + p.premium, 0)
                    .toLocaleString()}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Policies */}
        {activeTab === "policies" && (
          <div className={styles.section}>
            <div className={styles3.sectionHeader}>
              <h2>Customer Policies</h2>
              <input
                type="text"
                placeholder="Search policies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={styles3.searchInput}
              />
            </div>

            <div className={styles3.grid}>
              {filteredPolicies.map((policy) => (
                <div key={policy.id} className={styles3.card}>
                  <h3 className={styles.cardhead}>{policy.type}</h3>
                  <p className={styles.pn}>
                    Policy: {policy.policyNumber} | Customer:{" "}
                    {getCustomerName(policy.customerId)}
                  </p>

                  <div className={styles.pd}>

                  <p >
                    <strong>Premium:</strong> ${policy.premium}
                  </p>
                  <p>
                    <strong>Status:</strong>{" "}
                    <span
                      className={`${styles.status} ${
                        styles[policy.status.toLowerCase()]
                      }`}
                    >
                      {policy.status}
                    </span>
                  </p>
                  <p>
                    <strong>Period:</strong> {policy.startDate} to{" "}
                    {policy.endDate}
                  </p>
                </div>
                </div>
              ))}
            </div>
          </div>
          
        )}

        {/* Claims */}
        {activeTab === "claims" && (
          <div className={styles.section}>
            <div className={styles3.sectionHeader}>
              <h2>Process Claims</h2>
              <input
                type="text"
                placeholder="Search claims..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={styles3.searchInput}
              />
            </div>

            <div className={styles3.grid}>
              {filteredClaims.map((claim) => (
                <div key={claim.id} className={styles3.card}>
                  <h3>Claim {claim.claimNumber}</h3>
                  <p className={styles.pn}>
                    {claim.description} | Customer:{" "}
                    {getCustomerName(claim.customerId)}
                  </p>
                  <div className={styles.pd}>
                  <p >
                    <strong>Amount:</strong> ${claim.amount}
                  </p>
                  <p>
                    <strong>Status:</strong>{" "}
                    <span
                      className={`${styles.status} ${
                        styles[claim.status.toLowerCase()]

                      }
                      ${styles2.roleBadge}
                      `}
                    >
                      {claim.status}
                    </span>
                  </p>
                  <p>
                    <strong>Submitted:</strong> {claim.dateSubmitted}
                  </p>

                  {claim.status === "Pending" && (
                    <div className={styles.claimActions}>
                      <button
                        className={styles.btnPrimary}
                        onClick={() =>
                          handleProcessClaim(claim.id, "Approved")
                        }
                      >
                        Approve
                      </button>
                      <button
                        className={styles.btnDanger}
                        onClick={() =>
                          handleProcessClaim(claim.id, "Rejected")
                        }
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Create Policy */}
        {activeTab === "create" && (
          <div className={styles.section}>
            <h2 className={styles.ch}>Create New Policy</h2>
            <div className={styles.card}>
              <div className={styles.formGrid}>
                <div className={styles.inputGroup}>
                  <label>Policy Type</label>
                  <select
                    value={newPolicy.type}
                    onChange={(e) =>
                      setNewPolicy({ ...newPolicy, type: e.target.value })
                    }
                  >
                    <option value="">Select policy type</option>
                    <option value="Life Insurance">Life Insurance</option>
                    <option value="Health Insurance">Health Insurance</option>
                    <option value="Car Insurance">Car Insurance</option>
                    <option value="Home Insurance">Home Insurance</option>
                  </select>
                </div>

                <div className={styles.inputGroup}>
                  <label>Customer</label>
                  <select
                    value={newPolicy.customerId}
                    onChange={(e) =>
                      setNewPolicy({
                        ...newPolicy,
                        customerId: e.target.value,
                      })
                    }
                  >
                    <option value="">Select customer</option>
                    {customers.map((customer) => (
                      <option key={customer.id} value={customer.id}>
                        {customer.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className={styles.inputGroup}>
                  <label>Premium Amount</label>
                  <input
                    type="number"
                    placeholder="Enter premium amount"
                    value={newPolicy.premium}
                    onChange={(e) =>
                      setNewPolicy({
                        ...newPolicy,
                        premium: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <button
                onClick={handleCreatePolicy}
                className={styles.btnPrimary2}
              >
                Create Policy
              </button>
            </div>
          </div>
        )}
      </div>
  );
};

export default AgentDashboard;
