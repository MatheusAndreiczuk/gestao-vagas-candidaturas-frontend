import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Login from "./pages/Login"
import RegisterForm from './pages/Register'
import PrivateRoute from "./components/ProtectedRoute"
import Home from "./pages/Home"
import Profile from "./pages/Profile"
import Connection from "./pages/Connection"
import ConnectionLabel from "./components/ConnectionLabel"
import Job from './pages/Job'
import JobForm from './pages/Job/jobForm'
import EditJobForm from './pages/Job/editJob'
import JobApplication from "./pages/Job/jobApplication"
import Candidates from "./pages/Job/candidates"
import Applications from "./pages/Applications"
import ServerError from "./pages/ServerError"

function App() {

  return (
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true
      }}
    >
      <Routes>
        
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<RegisterForm />} />

        <Route path='/home' element={
        <PrivateRoute>
          <Home />
        </PrivateRoute>
        } />

        <Route path='/profile' element={
        <PrivateRoute>
          <Profile />
        </PrivateRoute>
        } />

        <Route path='/announce' element={
        <PrivateRoute>
          <JobForm />
        </PrivateRoute>
        } />

        <Route path='/jobs/edit/:id' element={
        <PrivateRoute>
          <EditJobForm />
        </PrivateRoute>
        } />

        <Route path='/jobs/:id' element={
        <PrivateRoute>
          <Job />
        </PrivateRoute>
        } />

        <Route path='/jobs/application/:id' element={
        <PrivateRoute>
          <JobApplication />
        </PrivateRoute>
        } />

        <Route path='/jobs/:id/candidates' element={
        <PrivateRoute>
          <Candidates />
        </PrivateRoute>
        } />

        <Route path='/applications' element={
        <PrivateRoute>
          <Applications />
        </PrivateRoute>
        } />

        <Route path="/connection" element={<Connection />} />
        
        <Route path="/server-error" element={<ServerError />} />
      </Routes>
      
      <ConnectionLabel />
    </BrowserRouter>
  )
}

export default App
