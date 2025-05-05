import { Route, Routes } from "react-router-dom"
import LoginPage from "./pages/LoginPage"
import LandingPage from "./pages/LandingPage";
import RegisterPage from "./pages/RegisterPage";
import ForgotPage from "./pages/ForgotPage";
import VerifyOtpPage from "./pages/VerifyOtpPage";
import ProtectedRoute from "./components/ProtectedRoute";





const App = () => {
  return (
    <Routes>
      <Route path='/login' element={<LoginPage />} />
      <Route path='/register' element={<RegisterPage />} />
      <Route path='/forgot' element={<ForgotPage />} />
      <Route path="/verify" element={<VerifyOtpPage />} />
      <Route
        path='/'
        element={
          <ProtectedRoute>
            <LandingPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};


export default App
