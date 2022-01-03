import React from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  return (
    <>
      <main>
        <h1>Welcome to Dashboard</h1>
        <button onClick={() => navigate('/login')}>Log out</button>
      </main>
    </>
  );
};
const mapStateToProps = (state) => ({
  authenticated: state.session.authenticated,
});

export default connect(mapStateToProps)(Dashboard);
