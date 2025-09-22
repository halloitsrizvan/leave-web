
import './App.css';
import {  useUser} from './Store/UserContext';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import StdHome from './Pages/StdHome';
import Signup from './Pages/SignupMian';
import LoginPage from './Pages/LoginPage';
import LeaveApplay from './Pages/LeaveApplay';
import LeaveStatusStd from './Pages/LeaveStatusStd';
import Message from './Pages/Message';
import TeacherHome from './UstAdmin/Pages/TeacherHome';
import AllMsg from './UstAdmin/Pages/AllMsg';
import AllStudents from './UstAdmin/Pages/AllStudents';
function App() {
  const {currentUser,userData} = useUser()
  return (
    <div className="App">
      
        <Router> 
          <Routes>
            <Route path="/" element={userData?.isAdmin?<TeacherHome/>:currentUser?<StdHome/>:<Signup/>}/>
            <Route path="/signup" element={<Signup/>}/>
            <Route path='/login' element={<LoginPage/>}/>
            <Route path='/applay-leave' element={<LeaveApplay/>}/>
            <Route path='/leave-status' element={<LeaveStatusStd/>}/>
            <Route path='/message' element={<Message/>}/>

            <Route path='/teachers-panel' element={userData?.isAdmin?<TeacherHome/>:'/'}/>
            <Route path='/leave-applications' element={userData?.isAdmin? <AllMsg/>:'/'}/>
            <Route path='/all-students' element={<AllStudents/>}/>
          </Routes>
        </Router>
      
    </div>
  );
}

export default App;
