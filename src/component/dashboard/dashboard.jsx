const Dashboard = () => {
  const handleLogout = () => {
    const tokeDelete = localStorage.removeItem("token");
    if (!tokeDelete) {
      window.location = "/";
    }
  };
  return (
    <>
      <h1>WELLCOME TO OUR WEBSITE</h1>
      <button onClick={handleLogout}>logout</button>
    </>
  );
};

export default Dashboard;
