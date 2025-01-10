import Signup from './pages/Signup.jsx';
import Login from './pages/Login.jsx';
import { CA } from './pages/Ca.jsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CAProfile from './pages/CaProfile.jsx';
import StudentProfile from './pages/Student_Profile.jsx';
import ProtectedRoute from './components/protected_route.jsx';
import { isAuthenticated } from './utils/auth.js';
import { Navigate } from 'react-router-dom';
import Logout from './components/logout.jsx';
import StartupProfile from './pages/startup.jsx';
import ProfessionalProfile from './pages/proffessional.jsx';
import { useEffect, useState } from 'react';
import axios from 'axios';

const App = () => {
  axios.defaults.baseURL = "http://127.0.0.1:8000";
  const [data, setData] = useState(null);
  const jwtToken = localStorage.getItem("jwtToken");
  const headers = {
    Authorization: `Bearer ${jwtToken}`,
  };

  useEffect(() => {
    const fetchData = async () => {
      if (jwtToken) {
        try {
          const res = await axios.get("/api/v1/get_user/", { headers });
          setData(res.data);
        } catch (err) {
          console.log(err);
        }
      }
    };
    fetchData();
  }, [jwtToken]);

  const getHomePageElement = () => {
    if (!data || !data) return null;
    switch (data.role) {
      case "Student":
        return <StudentProfile />;
      case "CA":
        return <CA />;
      case "Professional":
        return <ProfessionalProfile />;
      case "Startup":
        return <StartupProfile />;
      case "Contingent":
        return <div>Contingent Page (Placeholder)</div>; // Replace with the actual component
      default:
        return <Navigate to="/login" />;
    }
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={isAuthenticated() ? <Navigate to="/" /> : <Signup />} />
        <Route path="/login" element={isAuthenticated() ? <Navigate to="/" /> : <Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/startup" element={<StartupProfile />} />
        <Route path="/proffessional" element={<ProfessionalProfile />} />
        <Route path="/caprofile" element={<ProtectedRoute element={<CAProfile />} />} />
        <Route
          path="/"
          element={
            isAuthenticated() ? (
              <ProtectedRoute element={getHomePageElement()} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="/student_profile" element={<ProtectedRoute element={<StudentProfile />} />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
