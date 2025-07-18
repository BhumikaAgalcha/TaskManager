import React, { useContext } from "react"
import {BrowserRouter as Router,
        Routes,
        Route,
        Outlet,
        Navigate
} from "react-router-dom"
import Login from "./pages/Auth/Login"
import SignUp from "./pages/Auth/Signup"
import Dashboard from "./pages/Admin/Dashboard"
import ManageTasks from "./pages/Admin/ManageTasks"
import CreateTask from "./pages/Admin/CreateTask"
import ManageUser from "./pages/Admin/ManageUser"
import UserDashboard from "./pages/User/UserDashboard"
import MyTasks from "./pages/User/MyTasks"
import ViewTaskDetails from "./pages/User/ViewTaskDetails"
import PrivateRoute from "./routes/PrivateRoute"
import UserProvider, {UserContext} from "./context/userContext"

function App() {
  

  return (
    <UserProvider>
    <>
   
      <Router>
        <Routes>
          <Route path="/login" element={<Login/>}>  </Route>  
          <Route path="/signUp" element={<SignUp/>}> </Route>   

          {/* Admin Routes */}
          <Route element={<PrivateRoute allowedRoles={["admin"]}/>}>
            <Route path="/admin/dashboard" element={<Dashboard/>}/>
            <Route path="/admin/tasks" element={<ManageTasks/>}/>
            <Route path="/admin/create-task" element={<CreateTask/>}/>
            <Route path="/admin/users" element={<ManageUser/>}/>
          </Route>
          
          {/* User Routes */}
          <Route element={<PrivateRoute allowedRoles={["admin"]}/>}>
            <Route path="/user/userdashboard" element={<UserDashboard/>}/>
            <Route path="/user/my-tasks" element={<MyTasks/>}/>
            <Route path="/user/task-details/:id" element={<ViewTaskDetails/>}/>
          </Route>
        
          {/* Default Route */}
          <Route path="/" element={<Root/>}/>
        </Routes>
      </Router>
    </>
    </UserProvider>
  )
}

export default App;

const Root = () => {
  const {user, loading} = useContext(UserContext);

  if (loading) return <Outlet/>

  if (!user) {
    return <Navigate to="/login" />
  }

  return user.role === "admin" ? <Navigate to="/admin/dashboard" /> : <Navigate to="/user/userdashboard" />;
};
