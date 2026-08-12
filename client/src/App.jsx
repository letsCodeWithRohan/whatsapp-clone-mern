import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Error from './pages/Error'
import Status from './pages/Status'
import Call from './pages/Call'
import UserContextProvider from './context/UserContextProvider'
import Login from './pages/Login'
import Signup from './pages/Signup'
import { Toaster } from 'react-hot-toast'
import Settings from './pages/Settings'
import GeneralSettings from './Components/Settings/GeneralSettings'
import ProfileSettings from './Components/Settings/ProfileSettings'
import DefaultSettingsScreen from './Components/Settings/DefaultSettingsScreen'
import AuthFlow from './pages/ForgotPassword'
import ForgotPass from './pages/ForgotPass'
import VerifyOtp from './pages/VerifyOTP'

function App() {

  return (
    <UserContextProvider>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/status" element={<Status />} />
        <Route path="/call" element={<Call />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/fp" element={<AuthFlow />} />
        <Route path="/forgot-password" element={<ForgotPass />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/settings" element={<Settings/>}>
          <Route index element={<DefaultSettingsScreen />} />
          <Route path="general" element={<GeneralSettings />} />
          <Route path="profile" element={<ProfileSettings />} />
        </Route>
        <Route path="*" element={<Error />} />
      </Routes>
    </UserContextProvider>
  )
}

export default App
