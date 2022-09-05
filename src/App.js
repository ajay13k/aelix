import "bootstrap/dist/css/bootstrap.css";
import { Route, Switch } from "react-router-dom";
import LoginForm from "./component/loginForm/loginForm";
import Dashboard from "./component/dashboard/dashboard";
import Profile from "./component/profile/profile";
import ChangePassword from "./component/changePassword/changePassword";
import Pin from "./component/pin";
import Page404 from "./component/404";
import SidebarWithHeader from "./component/sidebarwithheader/SidebarWithHeader";
import CounSellor from "./component/counsellor/counsellor";
import AddCounsellor from "./component/counsellor/addCounsellor";
import EditCounsellor from "./component/counsellor/editCounsellor";
import StudentTable from "./component/student/studentTable";
import EditStudent from "./component/student/editStudent";
import AddStudent from "./component/student/addStudent";
import Chat from "./component/chat/chat";
import StudentAttendace from "./component/student/studentAttendance";
import ForgotPassword from "./forgotPassword";
function App() {
  return (
    <>
      <Switch>
        <Route exact path="/" component={LoginForm} />
        <Route path="/SidebarWithHeader" component={SidebarWithHeader} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/myprofile" component={Profile} />
        <Route path="/students" component={StudentTable} />
        <Route path="/addstudent" component={AddStudent} />
        <Route path="/editstudent:id" component={EditStudent} />
        <Route path="/counsellor" component={CounSellor} />
        <Route path="/addcounsellor" component={AddCounsellor} />
        <Route path="/editcounsellor:id" component={EditCounsellor} />
        <Route path="/changepassword" component={ChangePassword} />
        <Route path="/pin" component={Pin} />
        <Route path="/chat" component={Chat} />
        <Route path="/attendace" component={StudentAttendace} />
        <Route path="/forgotpassword" component={ForgotPassword} />
        <Route path="/*" component={Page404} />
      </Switch>
    </>
  );
}

export default App;
