import "bootstrap/dist/css/bootstrap.css";
import { Route, Switch } from "react-router-dom";
import StudentTable from "./component/student/studentTable";
import LoginForm from "./component/loginForm/loginForm";
import Dashboard from "./component/dashboard/dashboard";
import Profile from "./component/profile/profile";
import SidebarWithHeader from "./component/Navbar.jsx";
import ChangePassword from "./component/changePassword/changePassword";
function App() {
  return (
    <>
          <Switch>
          <Route exact path="/" component={LoginForm} />
            <Route exact path="/SidebarWithHeader" component={SidebarWithHeader} />
            <Route path="/students" component={StudentTable} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/myprofile" component={Profile} />
            <Route path="/changepassword" component={ChangePassword} />
          </Switch>
    </>
  );
}

export default App;
