import "bootstrap/dist/css/bootstrap.css";
import { Route, Switch } from "react-router-dom";
import StudentTable from "./component/student/studentTable";
import LoginForm from "./component/loginForm/loginForm";
import Dashboard from "./component/dashboard/dashboard";
import Profile from "./component/profile/profile";
import ChangePassword from "./component/changePassword/changePassword";
import UsingFetch from "./component/student/studentAttendance";
import CounSellor from "./component/counsellor/counsellor";
import AddCounsellor from "./component/counsellor/addCounsellor";
import Pin from "./component/pin";
import Chatt from "./component/chat/chatt";
import Page404 from "./component/404";
import SidebarWithHeader from "./component/sidebarwithheader/SidebarWithHeader";
import AddStudent from "./component/student/addStudent";
import EditCounsellor from "./component/counsellor/editCounsellor";
function App() {
  return (
    <>
      <Switch>
        <Route exact path="/" component={LoginForm} />
        <Route path="/SidebarWithHeader" component={SidebarWithHeader} />
        <Route path="/students" component={StudentTable} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/myprofile" component={Profile} />
        <Route path="/changepassword" component={ChangePassword} />
        <Route path="/counsellor" component={CounSellor} />
        <Route path="/addcounsellor" component={AddCounsellor} />
        <Route path="/studentAttendace" component={UsingFetch} />
        <Route path="/pin" component={Pin} />
        {/* <Route path="/chat" component={Chatt} /> */}
        <Route path="/addstudent" component={AddStudent} />
        <Route path="/editcounsellor:id" component={EditCounsellor} />
        <Route path="/*" component={Page404} />
      </Switch>
    </>
  );
}

export default App;
