// src/pages/Dashboard.jsx
import { useKeycloak } from '@react-keycloak/web';

const Dashboard = () => {
  const { keycloak } = useKeycloak();

  const fullName = keycloak?.tokenParsed?.name || "User";

  return (
    <div>
      <h1>Welcome, {fullName}</h1>
      <button onClick={() => keycloak.logout()}>Logout</button>
    </div>
  );
};

export default Dashboard;
